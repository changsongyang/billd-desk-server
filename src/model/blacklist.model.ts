import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import sequelize from '@/config/mysql';
import { initTable } from '@/init/initDb';
import { IBlacklist } from '@/interface';

interface BlacklistModel
  extends Model<
      InferAttributes<BlacklistModel>,
      InferCreationAttributes<BlacklistModel>
    >,
    IBlacklist {}

const model = sequelize.define<BlacklistModel>(
  'blacklist',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ip: {
      type: DataTypes.STRING(500),
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.INTEGER, // 禁用类型,1:频繁操作；2:管理员手动禁用
    },
    msg: {
      type: DataTypes.STRING(100),
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

initTable({ model, sequelize });

export default model;
