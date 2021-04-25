import { GetATodoRequest, CreateTodoRequest } from "stubs/todo/messages_pb";
import { VerifyTokenRequest } from "stubs/auth/messages_pb";

// eslint-disable-next-line import/prefer-default-export
export const createVerifyTokenRequest = (data) => {
  const verifyTokenRequest = new VerifyTokenRequest();
  verifyTokenRequest.setToken(data.token);
  verifyTokenRequest.setTokenType(data.tokenType);
  verifyTokenRequest.setCurrentUrl(data.setCurrentUrl);
  return verifyTokenRequest;
};

export const createGetATodoRequest = (data) => {
  const getAtodoRequest = new GetATodoRequest();
  getAtodoRequest.setTodoId(data.todoId);
  return getAtodoRequest;
};

export const createNewTodoRequest = (data) => {
  const newTodoRequest = new CreateTodoRequest();
  newTodoRequest.setNote(data.note);
  newTodoRequest.setSubject(data.subject);
  // NB: use conditional for optional parameter e.g if(data.dueDate) newTodorequest.setDueDate(data.dueDate)
  return newTodoRequest;
};
