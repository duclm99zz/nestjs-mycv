import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler, ClassSerializerInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';


interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize (dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto))
}

export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {

  }
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}