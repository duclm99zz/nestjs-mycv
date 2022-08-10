import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => { 
    // context is wrapper of incoming request
    const request = context.switchToHttp().getRequest()
    
    return request

  }
)