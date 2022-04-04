import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common'
import { ArticleService } from '@app/article/article.service'
import { AuthGuard } from '@app/user/guards/auth.guard'
import { User } from '@app/user/decorators/user.decorator'
import { UserEntity } from '@app/user/user.entity'
import CreateArticleDto from '@app/article/dto/createArticle.dto'
import { ArticleResponseInterface } from '@app/article/types/articleResponse.interface'
import { ArticlesResponseInterface } from '@app/article/types/articlesResponse.interface'
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe'

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(
        @User('id') currentUserId: number,
        @Query() query: any,
    ): Promise<ArticlesResponseInterface> {
        return this.articleService.findAll(currentUserId, query)
    }

    @Get('feed')
    @UseGuards(AuthGuard)
    async getFeed(
        @User('id') currentUserId: number,
        @Query() query: any,
    ): Promise<ArticlesResponseInterface> {
        return await this.articleService.getFeed(currentUserId, query)
    }

    @Get(':slug')
    async getSingleArticle(
        @Param('slug') slug: string,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.findBySlug(slug)

        return this.articleService.buildArticleResponse(article)
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new BackendValidationPipe())
    async create(
        @User() currentUser: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(
            currentUser,
            createArticleDto,
        )

        return this.articleService.buildArticleResponse(article)
    }

    @Post(':slug/favorite')
    @UseGuards(AuthGuard)
    async addArticleToFavorites(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.addArticleToFavorites(
            slug,
            currentUserId,
        )

        return this.articleService.buildArticleResponse(article)
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new BackendValidationPipe())
    async update(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
        @Body('article')
        updateArticleDto: CreateArticleDto,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.updateArticle(
            slug,
            updateArticleDto,
            currentUserId,
        )

        return this.articleService.buildArticleResponse(article)
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async delete(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
    ) {
        return await this.articleService.deleteArticle(currentUserId, slug)
    }

    @Delete(':slug/favorite')
    @UseGuards(AuthGuard)
    async deleteArticleFromFavorites(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.deleteArticleFromFavorites(
            slug,
            currentUserId,
        )

        return this.articleService.buildArticleResponse(article)
    }
}
