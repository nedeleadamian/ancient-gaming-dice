import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './api/user/models/user.model';
import { BetModel } from './api/bet/models/bet.model';

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @InjectModel(BetModel)
    private betModel: typeof BetModel,
  ) {}

  async seed() {
    try {
      let dbUsers = await this.userModel.findAll();
      const dbBets = await this.betModel.findAll();

      if (!dbUsers.length) {
        dbUsers = await this.seedUsers();
        this.logger.log('Users seeded successfully');
      }

      if (!dbBets.length) {
        await this.seedBets(dbUsers);
        this.logger.log('Bets seeded successfully');
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async seedUsers(): Promise<UserModel[]> {
    // Generate 10 users with random names and balances
    const usersToCreate = [];
    for (let i = 1; i <= 10; i++) {
      const user = {
        name: `User${i}`,
        balance: Number((Math.random() * 100000).toFixed(3)), // Generate a random balance
      };
      usersToCreate.push(user);
    }
    // Create the users in the database
    return this.userModel.bulkCreate(usersToCreate);
  }

  private async seedBets(dbUsers: UserModel[]) {
    // Generate 100 bets with random userIds
    const betsToCreate = [];
    for (let i = 1; i <= 100; i++) {
      const bet = {
        userId: dbUsers[Math.floor(Math.random() * dbUsers.length)].id,
        betAmount: Math.random() * 1000, // Generate a random amount
        chance: Math.random() * 100, // Generate a random chance
        payout: Math.random() * 1000, // Generate a random payout
        win: Math.random() >= 0.5, // Generate a random win
      };
      betsToCreate.push(bet);
    }

    return this.betModel.bulkCreate(betsToCreate);
  }
}
