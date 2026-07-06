import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { isURL } from "validator";

@ValidatorConstraint({ async: false })
class IsUrlFlexibleConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    const requireTld = process.env.NODE_ENV !== "development";
    return typeof value === "string" && isURL(value, { require_tld: requireTld });
  }
}

export function IsUrlFlexible(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUrlFlexibleConstraint,
    });
  };
}
