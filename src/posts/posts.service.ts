import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/posts.schemas';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  // ✅ Create a new post
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  // ✅ Get all posts
  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  // ✅ Get single post by ID
  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  // ✅ PATCH (partial update)
  async updatePartial(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
  }

  // ✅ PUT (full update → replaces old values)
  async updateFull(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(
      id,
      { $set: updatePostDto },  // overwrite all fields
      { new: true, overwrite: true } // overwrite ensures full replacement
    ).exec();
  }

  // ✅ Delete post by ID
  async remove(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
