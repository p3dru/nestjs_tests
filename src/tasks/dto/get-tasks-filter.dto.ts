import { TaskStatus } from "../task.model";

//o ? significa parametros opcionais
export class GetTasksFilterDto{
    status? : TaskStatus;
    search? : string;
}
