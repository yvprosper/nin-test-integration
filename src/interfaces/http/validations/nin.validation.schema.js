/* eslint-disable import/prefer-default-export */
import BaseJoi from "joi";
import JoiDateExtention from "@hapi/joi-date";
// import moment from "moment";
// let tomorrow = moment().add(24, "hours").format("YYYY-MM-DD");
const Joi = BaseJoi.extend(JoiDateExtention);

// validation for generating vNIN
export const generateVninSchema = Joi.object({
  userID: Joi.string().required(),
  consent: Joi.boolean().required(),
});


// validation for verifying vNIN
export const verifyVninSchema = Joi.object({
    vNIN: Joi.string().required(),
    consent: Joi.boolean().required(),
  });
