"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new jwt_1.JwtService({});
    const authToken = request.headers.authorization.split(' ')[1];
    const user = jwtService.decode(authToken);
    return user;
});
//# sourceMappingURL=user.decorator.js.map