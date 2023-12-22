"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninAuthDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const signup_auth_dto_1 = require("./signup-auth.dto");
class SigninAuthDto extends (0, mapped_types_1.PartialType)(signup_auth_dto_1.SignupAuthDto) {
}
exports.SigninAuthDto = SigninAuthDto;
//# sourceMappingURL=signin-auth.dto.js.map