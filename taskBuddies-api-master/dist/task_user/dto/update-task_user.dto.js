"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_user_dto_1 = require("./create-task_user.dto");
class UpdateTaskUserDto extends (0, mapped_types_1.PartialType)(create_task_user_dto_1.CreateTaskUserDto) {
}
exports.UpdateTaskUserDto = UpdateTaskUserDto;
//# sourceMappingURL=update-task_user.dto.js.map