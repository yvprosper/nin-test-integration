import publishToRabitmq from "infra/libs/publishToRabitmq";
import BaseRepository from "./BaseRepository";
import BadRequestError from "interfaces/http/errors/BadRequest";
import axios from "axios";
import crypto from "crypto"
import fs from "fs"

class NinRepository extends BaseRepository {
  constructor({
    cache,
    config,
    elasticClient,
    models: { Dummy },
    tracing: { tracer, logSpanError, traceMongoQuery },
  }) {
    super({ Model: Dummy });
    this.Todo = Dummy;
    this.tracer = tracer;
    this.logSpanError = logSpanError;
    this.traceMongoQuery = traceMongoQuery;
    this.cache = cache;
    this.shortCode = config.get('nin.shortCode')
    this.agentID = config.get('nin.agentID')
    this.ninApiKey = config.get('nin.apiKey')
    this.vninGenerationUrl = config.get('nin.vninGenerationUrl')
    this.vninVerificationUrl = config.get('nin.vninVerificationUrl')
    this.publishToRabitmq = publishToRabitmq;
    this.elasticClient = elasticClient;
  }

  /**
   * Create a todo
   * @param { Object } payload
   * @returns {Promise}
   * @memberof NinRepository
   */
  async generateVNin(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userID, consent } = payload;
        if (consent !== true) throw new BadRequestError('candidate consent not granted')

        const body = {
            userID,
            shortCode: this.shortCode
        }
        const axiosConfig = {
            headers: {
                'x-api-key': this.ninApiKey,
            }
        };

        const response = await axios.post(this.vninGenerationUrl, body, axiosConfig)
        .then((response)=>{
           return response.data.data
        })
        .catch((error)=> {
            throw error
        })

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  async verifyVNin(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { vNIN, consent } = payload;
        if (consent !== true) throw new BadRequestError('candidate consent not granted')

        const body = {
            agentID: this.agentID,
            vNIN,
            RPShortCode: this.shortCode
        }
        const axiosConfig = {
            headers: {
                'x-api-key': this.ninApiKey,
            }
        };

        const response = await axios.post(this.vninVerificationUrl, body, axiosConfig)
        .then((response)=>{
            let data = response.data.data;
            
            if (!data) throw new BadRequestError(response.data.message)
            
            let photograph = response.data.photograph
            
            let buff = new Buffer.from(data, 'base64');

            const privateKey = fs.readFileSync('src/config/testkey.key', 'utf-8')

            const decryptedData = crypto.privateDecrypt(
                {
                  key: privateKey.toString(),
                  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                },
                buff
              );
           const body =  JSON.parse(decryptedData.toString())
           return {body, photograph}
        })
        .catch((error)=> {
            throw error
        })

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default NinRepository;
