import mongoose from 'mongoose';
import Asset from '..//models/Asset'; // اگر مدل Asset داری، مسیرش رو اصلاح کن

export async function getAssetData() {
  await mongoose.connect(process.env.MONGODB_URI); // اتصال به دیتابیس

  const assets = await Asset.aggregate([
    {
      $group: {
        _id: "$date",
        totalValue: { $avg: { $toDouble: "$totalValue" } }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  return assets.map(d => ({
    date: new Date(d._id),
    totalValue: d.totalValue
  }));
}
