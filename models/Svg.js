import { getDatabase } from '../database.js';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'svgs';

export class SvgModel {
  static async create(svgData) {
    try {
      const db = getDatabase();
      const collection = db.collection(COLLECTION_NAME);
      
      const newSvg = {
        ...svgData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await collection.insertOne(newSvg);
      return { ...newSvg, _id: result.insertedId };
    } catch (error) {
      console.error('Error creating SVG:', error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const db = getDatabase();
      const collection = db.collection(COLLECTION_NAME);
      
      const svgs = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return svgs;
    } catch (error) {
      console.error('Error fetching SVGs:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const db = getDatabase();
      const collection = db.collection(COLLECTION_NAME);
      
      const svg = await collection.findOne({ _id: new ObjectId(id) });
      return svg;
    } catch (error) {
      console.error('Error fetching SVG by ID:', error);
      throw error;
    }
  }

  static async updateById(id, updateData) {
    try {
      const db = getDatabase();
      const collection = db.collection(COLLECTION_NAME);
      
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...updateData, 
            updatedAt: new Date() 
          } 
        }
      );
      
      if (result.matchedCount === 0) {
        return null;
      }
      
      return await this.findById(id);
    } catch (error) {
      console.error('Error updating SVG:', error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const db = getDatabase();
      const collection = db.collection(COLLECTION_NAME);
      
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting SVG:', error);
      throw error;
    }
  }

  static async search(query) {
    try {
      const db = getDatabase();
      const collection = db.collection(COLLECTION_NAME);
      
      const searchRegex = new RegExp(query, 'i');
      const svgs = await collection.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex }
        ]
      }).sort({ createdAt: -1 }).toArray();
      
      return svgs;
    } catch (error) {
      console.error('Error searching SVGs:', error);
      throw error;
    }
  }
}
