import { GenericAggregation } from '@Aggregations/generic.aggregation';
import { User } from '@Models/user.model';
import {IUser, UserType} from '@Types/user.types'
import { FilterValidationType } from '@Validations/pagination.validation';
import bcrypt from 'bcrypt';

class UserServiceClass {
  private saltRounds: number;

  constructor() {
    this.saltRounds = 10; 
  }

  findUserByEmail = async (email: string): Promise<UserType | null> => {
    return await User.findOne({ email });
  };

  createUser = async ({ name, email, password }: { name: string, email: string, password: string }): Promise<IUser> => {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const newUser = new User({ name, email, password: hashedPassword });
    return await newUser.save();
  };

  matchPassword = async (email: string, password: string): Promise<boolean> => {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  };

  listAllUsers = async (data: {
    filter?: FilterValidationType;
    page: number;
    limit: number;
  }) => {
    const { filter, page, limit } = data;
  
    const aggregation = GenericAggregation.aggregateUsers({ page, limit, filter });
    const result = await User.aggregate(aggregation).exec(); 
  
    return {
      count: result[0]?.totalCount || 0,
      result: result[0]?.data || [],
    };
  };
  
}

export const UserService = new UserServiceClass();
