import { FilterPipe } from './filter.pipe';
import { ViewTaskComponent } from '../view-task/view-task.component';

describe('FilterPipe', () => {
  it('create an instance', () => {
    let viewTask: ViewTaskComponent;
    const pipe = new FilterPipe(viewTask);
    expect(pipe).toBeTruthy();
  });
});
