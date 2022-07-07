import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { ProductOptionModule } from './product-option/product-option.module';
import { TagModule } from './tag/tag.module';
import { ProductColorImageModule } from './product-color-image/product-color-image.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ProductModule,
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ColorModule,
    SizeModule,
    ProductOptionModule,
    TagModule,
    ProductColorImageModule,
    OrderModule,
    OrderItemModule,
    CartModule,
    CartItemModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
