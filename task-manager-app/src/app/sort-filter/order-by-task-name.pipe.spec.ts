import { OrderByTaskNamePipe } from './order-by-task-name.pipe';
import { ViewTaskComponent } from '../view-task/view-task.component';

describe('OrderByTaskNamePipe', () => {
  it('create an instance', () => {
    let viewTask: ViewTaskComponent;
    const pipe = new OrderByTaskNamePipe(viewTask);
    expect(pipe).toBeTruthy();
  });
});
