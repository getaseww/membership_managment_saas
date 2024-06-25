import { DataTypes, Model, Sequelize } from "sequelize";
import { Role } from "./Role";
import { hashPassword } from "../utils/helpers";
import { Profile } from "./Profile";

export class User extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public company_category!: string;
  public phone_number!: string;
  public password!: string;
  public role_id!: string;
  public user_id!: string;
  public role!: Role;
  public profile!: Profile;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
    }


  );
  User.beforeCreate((user, options) => {
    if (user.password) {
      return hashPassword(user.password)
        .then((hashed: any) => {
          user.password = hashed;
        })
        .catch((error: any) => {
          throw new error;
        });
    }
  });

  User.beforeUpdate((user, options) => {
    if (user.changed("password")) {
      return hashPassword(user.password)
        .then((hashed) => {
          user.password = hashed;
        })
        .catch((error) => {
          throw new error;
        });
    }
  });

};