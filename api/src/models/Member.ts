import { DataTypes, Model, Sequelize } from "sequelize";

export class Member extends Model {
    public id!: number;
    public userId!:number;
    public firstName!: string;    
    public lastName!: string;
    public email!: string;
    public phoneNumber!: string;
    public password!: string;
    public sex!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default (sequelize: Sequelize) => {
    Member.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sex: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "member",
        tableName: "members",
      }
    );


  };