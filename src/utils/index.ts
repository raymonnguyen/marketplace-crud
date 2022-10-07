import {isEmpty,isNil} from 'lodash';

const checkFields = (fields: (string | number)[]): boolean => {
  return fields.every((f) => !isEmpty(f) && !isNil(f))
}

export default checkFields
