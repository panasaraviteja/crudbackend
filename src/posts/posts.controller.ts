import { Controller, Get, Post, Body, Param, Patch, Delete, Put, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostDocument } from './schemas/posts.schemas';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostDocument> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(): Promise<PostDocument[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostDocument> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDocument> {
    const updated = await this.postsService.updatePartial(id, updatePostDto);
    if (!updated) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return updated;
  }

  @Put(':id')
  async updateFull(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDocument> {
    const updated = await this.postsService.updateFull(id, updatePostDto);
    if (!updated) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean; id: string }> {
    const deleted = await this.postsService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { success: true, id }; // ✅ always JSON
  }
}
