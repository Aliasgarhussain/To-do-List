const Task = require('../models/taskModel');

class TaskService {
  async getAllTasks(filters = {}) {
    const { status, priority, search, sortBy = 'createdAt', order = 'desc' } = filters;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const sortOrder = order === 'asc' ? 1 : -1;
    
    const tasks = await Task.find(query).sort({ [sortBy]: sortOrder });
    return tasks;
  }

  async getTaskById(taskId) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    return task;
  }

  async createTask(taskData) {
    const task = new Task(taskData);
    await task.save();
    return task;
  }

  async updateTask(taskId, updateData) {
    const task = await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    
    return task;
  }

  async deleteTask(taskId) {
    const task = await Task.findByIdAndDelete(taskId);
    
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    
    return task;
  }

  async updateTaskStatus(taskId, status) {
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      const error = new Error('Invalid status value');
      error.status = 400;
      throw error;
    }
    
    return await this.updateTask(taskId, { status });
  }

  async getTasksByStatus(status) {
    return await Task.find({ status }).sort({ createdAt: -1 });
  }

  async searchTasks(searchTerm) {
    return await Task.find({
      $text: { $search: searchTerm }
    }).sort({ score: { $meta: 'textScore' } });
  }
}

module.exports = new TaskService();
