/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import {
  Attachment,
  Todo,
  GetATodoResponse,
  CreateTodoResponse,
  Pagination,
  GetAllTodosResponse,
} from "stubs/todo/messages_pb";

const createAtachment = (attachment) => {
  const todoAttachment = new Attachment();
  todoAttachment.setId(attachment._id && attachment._id.toString());
  todoAttachment.setCreatedAt(attachment.createdAt);
  todoAttachment.setFileSizeInByte(attachment.fileSizeInByte);
  todoAttachment.setFileType(attachment.fileType);
  todoAttachment.setFileUrl(attachment.fileUrl);
  return todoAttachment;
};

const createPagination = (paginationData) => {
  const pagination = new Pagination();
  pagination.setTotalDocs(paginationData.totalDocs);
  pagination.setPerPage(paginationData.perPage);
  pagination.setTotalPages(paginationData.totalPages);
  pagination.setCurrentPage(paginationData.currentPage);
  pagination.setHasPrevPage(paginationData.hasPrevPage);
  pagination.setHasNextPage(paginationData.hasNextPage);
  pagination.setPrevPage(paginationData.prevPage);
  pagination.setNextPage(paginationData.nextPage);
  return pagination;
};

const createAttachmentList = (attachments) => {
  if (!attachments) return [];
  const todoAttachments = attachments.map(createAtachment);
  return todoAttachments;
};

const createTodo = (todoData) => {
  const attachmentList = createAttachmentList(todoData.attachments);
  const todo = new Todo();
  todo.setId(todoData.id);
  todo.setDueDate(todoData.dueDate);
  todo.setCompletedAt(todoData.completedAt);
  todo.setCreatedAt(todoData._createdAt);
  todo.setLastModifiedAt(todoData._lastModifiedAt);
  todo.setIsImportant(todoData.isImportant);
  todo.setNote(todoData.note);
  todo.setStatus(todoData.status);
  todo.setSubject(todoData.subject);
  todo.setAttachmentsList(attachmentList);
  return todo;
};

const createTodoList = (todos) => {
  const todoList = todos.map(createTodo);
  return todoList;
};

export const createTodoResponse = (todoData) => {
  const getATodoResponse = new GetATodoResponse();
  const todo = createTodo(todoData);
  getATodoResponse.setTodo(todo);
  getATodoResponse.setSuccess(true);
  return getATodoResponse;
};

export const createNewTodoResponse = (todoData) => {
  const createANewTodoResponse = new CreateTodoResponse();
  const todo = createTodo(todoData);
  createANewTodoResponse.setTodo(todo);
  createANewTodoResponse.setSuccess(true);
  return createANewTodoResponse;
};

export const createAllTodosResponse = (todoData) => {
  const pagination = createPagination(todoData.paginatioin);
  const todoList = createTodoList(todoData.docs);
  const getAllTodoResponse = new GetAllTodosResponse();
  getAllTodoResponse.setPagination(pagination);
  getAllTodoResponse.setTodosList(todoList);
  getAllTodoResponse.setSuccess(true);
};
