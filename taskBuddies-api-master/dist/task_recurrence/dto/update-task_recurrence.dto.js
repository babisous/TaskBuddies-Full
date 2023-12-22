"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskRecurrenceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_recurrence_dto_1 = require("./create-task_recurrence.dto");
class UpdateTaskRecurrenceDto extends (0, mapped_types_1.PartialType)(create_task_recurrence_dto_1.CreateTaskRecurrenceDto) {
}
exports.UpdateTaskRecurrenceDto = UpdateTaskRecurrenceDto;
//# sourceMappingURL=update-task_recurrence.dto.js.map