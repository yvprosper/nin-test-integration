/* export class UserMap extends Mapper<User> {
    public static toDTO (user: User): UserDTO {
      id: user.id.toString(),
      userName: user.name.value,
      userEmail: user.email.value
    }
  
    public static toPersistence (user: User): any {
      return {
        user_id: user.id.toString(),
        user_name: user.name.value,
        user_email: user.email.value,
        is_active: user.isActive()
      }
    }
  
    public static toDomain (raw: any): User {
      const nameOrResult = UserName.create(raw.user_name);
      const emailOrResult = UserEmail.create(raw.user_email);
      const passwordOrResult = UserPassword.create(raw.user_password);
  
      return User.create({
        name: nameOrResult.getValue(),
        password: passwordOrResult.getValue(),
        email: emailOrResult.getValue(),
        active: raw.is_active,
      }, new UniqueEntityID(raw.user_id)).getValue()
    }
  } */

// create a class for converting gRPC models here
