/* eslint-disable no-await-in-loop */
import { EXCHANGE_NAME, channelWrapper } from "./rabbitmqSetup";

const publishToRabitmq = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataToPublish = data;

      if (!Array.isArray(data)) {
        dataToPublish = [data];
      }

      if (dataToPublish.length > 0) {
        for (let i = 0; i < dataToPublish.length; i += 1) {
          const { message, routingKey } = dataToPublish[i];
          console.log({ message, routingKey });
          await channelWrapper.publish(EXCHANGE_NAME, routingKey, message, {
            deliveryMode: 2,
            mandatory: true,
          });
        }
      } else {
        reject(new Error("Nothing to publish. Please provide job description"));
      }
      resolve({ done: true });
    } catch (error) {
      reject(error);
    }
  });
};

export default publishToRabitmq;
