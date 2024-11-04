import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('taskQueue') private taskQueue: Queue) {}

  async addTask(data: any) {
    await this.taskQueue.add(data);
  }
}
