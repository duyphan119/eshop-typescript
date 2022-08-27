import { db } from "../utils/db.server";
import * as argon from "argon2";
const seed = async () => {
	try {
		const roleAdmin = await db.role.create({
			data: {
				name: "ADMIN",
			},
		});
		console.log(roleAdmin);
		const roleCustomer = await db.role.create({
			data: {
				name: "CUSTOMER",
			},
		});
		const admin = await db.user.create({
			data: {
				email: "duychomap123@gmail.com",
				hash: await argon.hash("123456"),
				fullName: "Phan Khánh Duy",
				phone: "0385981196",
			},
		});
		const user1 = await db.user.create({
			data: {
				fullName: "Jun Vũ",
				email: "junvu@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$4wKZKsm7Y/mpQiPoSZbB5g$R0QZxzjb8zjXDP8bsl+7uYUHAXu4qSpUXCpl+K3TvSk",
				phone: "0359811123",
			},
		});
		const user2 = await db.user.create({
			data: {
				fullName: "Nguyễn Thị Phi Yến",
				email: "ntpy1@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$7dWyi3wtFHxoLmw2QCTYoA$hlALg7vD8TrIwA8AWKxsdhantOYAeY5HlouQyVr+syE",
				phone: "0325689174",
			},
		});
		const user3 = await db.user.create({
			data: {
				fullName: "Nguyễn Thị Thu Hương",
				email: "ntth123@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$CfjO6Uhg/YmGdmaD3IKRWA$XeM0/3WDzHjF3nlX5bN5yIet4EEF7Uuwdb0FCJ3HXr8",
				phone: "0385181196",
			},
		});
		const user4 = await db.user.create({
			data: {
				fullName: "Phạm Thanh Long",
				email: "ptl123@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$7gaEHr53BsqHuv1SrTAJ+w$vgCtZVG6aNv1qv8nmXDbtzltxDpoNUEoLVLAdcXaGDw",
				phone: "0385001196",
			},
		});

		const rolesAdmin = await db.userRole.createMany({
			data: [
				{
					userId: admin.id,
					roleId: roleAdmin.id,
				},
				{
					userId: user1.id,
					roleId: roleCustomer.id,
				},
				{
					userId: user2.id,
					roleId: roleCustomer.id,
				},
				{
					userId: user3.id,
					roleId: roleCustomer.id,
				},
				{
					userId: user4.id,
					roleId: roleCustomer.id,
				},
			],
		});
		const orderStatusPending = await db.orderStatus.create({
			data: {
				name: "Đang xử lý",
				type: "Pending",
			},
		});
		const orderStatusDelivering = await db.orderStatus.create({
			data: {
				name: "Đang giao hàng",
				type: "Delivering",
			},
		});
		const orderStatusDelivered = await db.orderStatus.create({
			data: {
				name: "Đã giao",
				type: "Delivered",
			},
		});
		const paymentMethodCOD = await db.paymentMethod.create({
			data: {
				name: "Thanh toán tại nhà (COD)",
			},
		});
		// const variantColor = await db.variant.create({
		// 	data: {
		// 		name: "Màu sắc",
		// 	},
		// });
		// const variantSize = await db.variant.create({
		// 	data: {
		// 		name: "Kích cỡ",
		// 	},
		// });
		await db.variant.createMany({
			data: [
				{ id: 1, name: "Màu sắc" },
				{ id: 2, name: "Kích cỡ" },
			],
		});
		await db.variantValue.createMany({
			data: [
				{ id: 1, name: "Black", variantId: 1 },
				{ id: 2, name: "White", variantId: 1 },
				{ id: 3, name: "Red", variantId: 1 },
				{ id: 4, name: "Pink", variantId: 1 },
				{ id: 5, name: "Blue", variantId: 1 },
				{ id: 6, name: "Gray", variantId: 1 },
				{ id: 7, name: "Green", variantId: 1 },
				{ id: 8, name: "Yellow", variantId: 1 },
				{ id: 9, name: "Purple", variantId: 1 },
				{ id: 10, name: "Brown", variantId: 1 },
				{ id: 11, name: "Orange", variantId: 1 },
				{ id: 12, name: "S", variantId: 2 },
				{ id: 13, name: "M", variantId: 2 },
				{ id: 14, name: "L", variantId: 2 },
				{ id: 15, name: "XL", variantId: 2 },
				{ id: 16, name: "2XL", variantId: 2 },
				{ id: 17, name: "3XL", variantId: 2 },
				{ id: 18, name: "4XL", variantId: 2 },
			],
		});
		// const variantValueBlack = await db.variantValue.create({
		// 	data: {
		// 		name: "Black",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueWhite = await db.variantValue.create({
		// 	data: {
		// 		name: "White",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValuePurple = await db.variantValue.create({
		// 	data: {
		// 		name: "Purple",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueRed = await db.variantValue.create({
		// 	data: {
		// 		name: "Red",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValuePink = await db.variantValue.create({
		// 	data: {
		// 		name: "Pink",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueBlue = await db.variantValue.create({
		// 	data: {
		// 		name: "Blue",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueGray = await db.variantValue.create({
		// 	data: {
		// 		name: "Gray",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueBrown = await db.variantValue.create({
		// 	data: {
		// 		name: "Brown",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueLightBlue = await db.variantValue.create({
		// 	data: {
		// 		name: "LightBlue",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueGreen = await db.variantValue.create({
		// 	data: {
		// 		name: "Green",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueOrange = await db.variantValue.create({
		// 	data: {
		// 		name: "Orange",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValueYellow = await db.variantValue.create({
		// 	data: {
		// 		name: "Yellow",
		// 		variantId: variantColor.id,
		// 	},
		// });
		// const variantValue100 = await db.variantValue.create({
		// 	data: {
		// 		name: "100",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue110 = await db.variantValue.create({
		// 	data: {
		// 		name: "110",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue120 = await db.variantValue.create({
		// 	data: {
		// 		name: "120",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue130 = await db.variantValue.create({
		// 	data: {
		// 		name: "130",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue140 = await db.variantValue.create({
		// 	data: {
		// 		name: "140",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue150 = await db.variantValue.create({
		// 	data: {
		// 		name: "150",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue160 = await db.variantValue.create({
		// 	data: {
		// 		name: "160",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValueS = await db.variantValue.create({
		// 	data: {
		// 		name: "S",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValueM = await db.variantValue.create({
		// 	data: {
		// 		name: "M",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValueL = await db.variantValue.create({
		// 	data: {
		// 		name: "L",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValueXL = await db.variantValue.create({
		// 	data: {
		// 		name: "XL",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue2XL = await db.variantValue.create({
		// 	data: {
		// 		name: "2XL",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue3XL = await db.variantValue.create({
		// 	data: {
		// 		name: "3XL",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const variantValue4XL = await db.variantValue.create({
		// 	data: {
		// 		name: "4XL",
		// 		variantId: variantSize.id,
		// 	},
		// });
		// const categoryTypeCustomer = await db.categoryType.create({
		// 	data: {
		// 		id: 1,
		// 		name: "Đối tượng khách hàng",
		// 	},
		// });
		// const categoryTypeProductFilter = await db.categoryType.create({
		// 	data: {
		// 		id: 2,
		// 		name: "Tất cả sản phẩm",
		// 	},
		// });
		// const categoryTypeCollection = await db.categoryType.create({
		// 	data: {
		// 		id: 3,
		// 		name: "Bộ sưu tập",
		// 	},
		// });
		await db.categoryType.createMany({
			data: [
				{ id: 1, name: "Đối tượng khách hàng" },
				{ id: 2, name: "Tất cả sản phẩm" },
				{ id: 3, name: "Bộ sưu tập" },
			],
		});
		await db.category.createMany({
			data: [
				{ id: 1, title: "Header", name: "Header", slug: "", categoryTypeId: null, parentId: null },

				{ id: 2, title: "Nữ", name: "Nữ", slug: "/nữ", categoryTypeId: 1, parentId: 1 },

				{ id: 3, title: "Sản phẩm mới", name: "Sản phẩm mới", slug: "/nu/san-pham-moi", categoryTypeId: 2, parentId: 2 },
				{ id: 4, title: "Canifa Z", name: "Canifa Z", slug: "/nu/canifa-z", categoryTypeId: 2, parentId: 2 },
				{ id: 5, title: "Thời trang hàng ngày", name: "Thời trang hàng ngày", slug: "/nu/thoi-trang-hang-ngay", categoryTypeId: 2, parentId: 2 },
				{ id: 6, title: "Đồ mặc nhà", name: "Đồ mặc nhà", slug: "/nu/do-mac-nha", categoryTypeId: 2, parentId: 2 },
				{ id: 7, title: "Thời trang thiết yếu", name: "Thời trang thiết yếu", slug: "/nu/thoi-trang-thieu-yeu", categoryTypeId: 2, parentId: 2 },
				{ id: 8, title: "Sản phẩm giá tốt", name: "Sản phẩm giá tốt", slug: "/nu/thoi-trang-thieu-yeu", categoryTypeId: 2, parentId: 2 },
				{ id: 9, title: "Giảm giá", name: "Giảm giá", slug: "/nu/giam-gia", categoryTypeId: 2, parentId: 2 },

				{ id: 10, title: "Áo phông", name: "Áo phông", slug: "/nu/san-pham-moi/ao-phong", categoryTypeId: 2, parentId: 3 },
				{ id: 11, title: "Áo sơ mi", name: "Áo sơ mi", slug: "/nu/san-pham-moi/ao-so-mi", categoryTypeId: 2, parentId: 3 },
				{ id: 12, title: "Áo kiểu", name: "Áo kiểu", slug: "/nu/san-pham-moi/ao-kieu", categoryTypeId: 2, parentId: 3 },
				{ id: 13, title: "Váy liền", name: "Váy liền", slug: "/nu/san-pham-moi/vay-lien", categoryTypeId: 2, parentId: 3 },
				{ id: 14, title: "Chân váy", name: "Chân váy", slug: "/nu/san-pham-moi/chan-vay", categoryTypeId: 2, parentId: 3 },
				{ id: 15, title: "Quần jeans", name: "Quần jeans", slug: "/nu/san-pham-moi/quan-jeans", categoryTypeId: 2, parentId: 3 },
				{ id: 16, title: "Quần shorts", name: "Quần shorts", slug: "/nu/san-pham-moi/quan-shorts", categoryTypeId: 2, parentId: 3 },
				{ id: 17, title: "Đồ mặc trong", name: "Đồ mặc trong", slug: "/nu/san-pham-moi/do-mac-trong", categoryTypeId: 2, parentId: 3 },
				{ id: 18, title: "Đồ mặc nhà", name: "Đồ mặc nhà", slug: "/nu/san-pham-moi/do-mac-nha", categoryTypeId: 2, parentId: 3 },
				{ id: 19, title: "Phụ kiện", name: "Phụ kiện", slug: "/nu/san-pham-moi/phu-kien", categoryTypeId: 2, parentId: 3 },
				{ id: 20, title: "Áo nỉ", name: "Áo nỉ", slug: "/nu/san-pham-moi/ao-ni", categoryTypeId: 2, parentId: 3 },

				{ id: 21, title: "Trend", name: "Trend", slug: "/nu/canifa-z/trend", categoryTypeId: 2, parentId: 4 },
				{ id: 22, title: "Art", name: "Art", slug: "/nu/canifa-z/art", categoryTypeId: 2, parentId: 4 },
				{ id: 23, title: "Base", name: "Base", slug: "/nu/canifa-z/base", categoryTypeId: 2, parentId: 4 },
				{ id: 24, title: "Phụ kiện Z", name: "Phụ kiện Z", slug: "/nu/canifa-z/phu-kien-z", categoryTypeId: 2, parentId: 4 },

				{ id: 25, title: "Áo phông", name: "Áo phông", slug: "/nu/thoi-trang-hang-ngay/ao-phong", categoryTypeId: 2, parentId: 5 },
				{ id: 26, title: "Áo polo", name: "Áo polo", slug: "/nu/thoi-trang-hang-ngay/ao-polo", categoryTypeId: 2, parentId: 5 },
				{ id: 27, title: "Áo sơ mi", name: "Áo sơ mi", slug: "/nu/thoi-trang-hang-ngay/ao-so-mi", categoryTypeId: 2, parentId: 5 },
				{ id: 28, title: "Áo kiểu", name: "Áo kiểu", slug: "/nu/thoi-trang-hang-ngay/ao-kieu", categoryTypeId: 2, parentId: 5 },
				{ id: 29, title: "Áo len", name: "Áo len", slug: "/nu/thoi-trang-hang-ngay/ao-len", categoryTypeId: 2, parentId: 5 },
				{ id: 30, title: "Áo nỉ", name: "Áo nỉ", slug: "/nu/thoi-trang-hang-ngay/ao-ni", categoryTypeId: 2, parentId: 5 },
				{ id: 31, title: "Quần jeans", name: "Quần jeans", slug: "/nu/thoi-trang-hang-ngay/quan-jeans", categoryTypeId: 2, parentId: 5 },
				{ id: 32, title: "Quần shorts", name: "Quần shorts", slug: "/nu/thoi-trang-hang-ngay/quan-shorts", categoryTypeId: 2, parentId: 5 },
				{ id: 33, title: "Quần dài", name: "Quần dài", slug: "/nu/thoi-trang-hang-ngay/quan-dai", categoryTypeId: 2, parentId: 5 },
				{ id: 34, title: "Quần kaki", name: "Quần kaki", slug: "/nu/thoi-trang-hang-ngay/quan-kaki", categoryTypeId: 2, parentId: 5 },
				{ id: 35, title: "Quần legging", name: "Quần legging", slug: "/nu/thoi-trang-hang-ngay/quan-legging", categoryTypeId: 2, parentId: 5 },
				{ id: 36, title: "Áo Blazer", name: "Áo Blazer", slug: "/nu/thoi-trang-hang-ngay/ao-blazer", categoryTypeId: 2, parentId: 5 },
				{ id: 37, title: "Áo khoác ngắn", name: "Áo khoác ngắn", slug: "/nu/thoi-trang-hang-ngay/ao-khoac-ngan", categoryTypeId: 2, parentId: 5 },
				{ id: 38, title: "Áo khoác gió", name: "Áo khoác gió", slug: "/nu/thoi-trang-hang-ngay/ao-khoac-gio", categoryTypeId: 2, parentId: 5 },
				{
					id: 39,
					title: "Váy liền thân (đầm)",
					name: "Váy liền thân (đầm)",
					slug: "/nu/thoi-trang-hang-ngay/vay-lien",
					categoryTypeId: 2,
					parentId: 5,
				},
				{ id: 40, title: "Chân váy", name: "Chân váy", slug: "/nu/thoi-trang-hang-ngay/chan-vay", categoryTypeId: 2, parentId: 5 },
				{ id: 41, title: "Chống nắng", name: "Áo hống nắng", slug: "/nu/thoi-trang-hang-ngay/ao-chong-nang", categoryTypeId: 2, parentId: 5 },

				{ id: 42, title: "Bộ mặc nhà", name: "Bộ mặc nhà", slug: "/nu/do-mac-nha/bo-mac-nha", categoryTypeId: 2, parentId: 6 },
				{ id: 43, title: "Áo mặc nhà", name: "Áo mặc nhà", slug: "/nu/do-mac-nha/ao-mac-nha", categoryTypeId: 2, parentId: 6 },
				{ id: 44, title: "Quần mặc nhà", name: "Quần mặc nhà", slug: "/nu/do-mac-nha/quan-mac-nha", categoryTypeId: 2, parentId: 6 },

				{ id: 45, title: "Phụ kiện", name: "Phụ kiện", slug: "/nu/thoi-trang-thiet-yeu/phu-kien", categoryTypeId: 2, parentId: 7 },
				{ id: 46, title: "Đồ mặc trong", name: "Đồ mặc trong", slug: "/nu/thoi-trang-thiet-yeu/do-mac-trong", categoryTypeId: 2, parentId: 7 },
				{ id: 47, title: "Đồ dùng cá nhân", name: "Đồ dùng cá nhân", slug: "/nu/thoi-trang-thiet-yeu/do-dung-ca-nhan", categoryTypeId: 2, parentId: 7 },

				{ id: 48, title: "Nam", name: "Nam", slug: "/nam", categoryTypeId: 1, parentId: 1 },

				{ id: 49, title: "Sản phẩm mới", name: "Sản phẩm mới", slug: "/nam/san-pham-moi", categoryTypeId: 2, parentId: 48 },
				{ id: 50, title: "Canifa Z", name: "Canifa Z", slug: "/nam/canifa-z", categoryTypeId: 2, parentId: 48 },
				{ id: 51, title: "Thời trang hàng ngày", name: "Thời trang hàng ngày", slug: "/nam/thoi-trang-hang-ngay", categoryTypeId: 2, parentId: 48 },
				{ id: 52, title: "Đồ mặc nhà", name: "Đồ mặc nhà", slug: "/nam/do-mac-nha", categoryTypeId: 2, parentId: 48 },
				{ id: 53, title: "Thời trang thiết yếu", name: "Thời trang thiết yếu", slug: "/nam/thoi-trang-thieu-yeu", categoryTypeId: 2, parentId: 48 },
				{ id: 54, title: "Sản phẩm giá tốt", name: "Sản phẩm giá tốt", slug: "/nam/thoi-trang-thieu-yeu", categoryTypeId: 2, parentId: 48 },
				{ id: 55, title: "Giảm giá", name: "Giảm giá", slug: "/nam/giam-gia", categoryTypeId: 2, parentId: 48 },

				{ id: 56, title: "Áo sơ mi", name: "Áo sơ mi", slug: "/nam/san-pham-moi/ao-so-mi", categoryTypeId: 2, parentId: 49 },
				{ id: 57, title: "Áo phông", name: "Áo phông", slug: "/nam/san-pham-moi/ao-phong", categoryTypeId: 2, parentId: 49 },
				{ id: 58, title: "Quần jeans", name: "Quần jeans", slug: "/nam/san-pham-moi/quan-jeans", categoryTypeId: 2, parentId: 49 },
				{ id: 59, title: "Quần shorts", name: "Quần shorts", slug: "/nam/san-pham-moi/quan-shorts", categoryTypeId: 2, parentId: 49 },
				{ id: 60, title: "Quần kaki", name: "Quần kaki", slug: "/nam/san-pham-moi/quan-kaki", categoryTypeId: 2, parentId: 49 },
				{ id: 61, title: "Đồ mặc nhà", name: "Đồ mặc nhà", slug: "/nam/san-pham-moi/do-mac-nha", categoryTypeId: 2, parentId: 49 },
				{ id: 62, title: "Áo nỉ", name: "Áo nỉ", slug: "/nam/san-pham-moi/ao-ni", categoryTypeId: 2, parentId: 49 },

				{ id: 63, title: "Trend", name: "Trend", slug: "/nam/canifa-z/trend", categoryTypeId: 2, parentId: 50 },
				{ id: 64, title: "Art", name: "Art", slug: "/nam/canifa-z/art", categoryTypeId: 2, parentId: 50 },
				{ id: 65, title: "Base", name: "Base", slug: "/nam/canifa-z/base", categoryTypeId: 2, parentId: 50 },
				{ id: 66, title: "Phụ kiện Z", name: "Phụ kiện Z", slug: "/nam/canifa-z/phu-kien-z", categoryTypeId: 2, parentId: 50 },

				{ id: 67, title: "Áo phông", name: "Áo phông", slug: "/nam/thoi-trang-hang-ngay/ao-phong", categoryTypeId: 2, parentId: 51 },
				{ id: 68, title: "Áo polo", name: "Áo polo", slug: "/nam/thoi-trang-hang-ngay/ao-polo", categoryTypeId: 2, parentId: 51 },
				{ id: 69, title: "Áo sơ mi", name: "Áo sơ mi", slug: "/nam/thoi-trang-hang-ngay/ao-so-mi", categoryTypeId: 2, parentId: 51 },
				{ id: 70, title: "Áo kiểu", name: "Áo kiểu", slug: "/nam/thoi-trang-hang-ngay/ao-kieu", categoryTypeId: 2, parentId: 51 },
				{ id: 71, title: "Áo len", name: "Áo len", slug: "/nam/thoi-trang-hang-ngay/ao-len", categoryTypeId: 2, parentId: 51 },
				{ id: 72, title: "Áo nỉ", name: "Áo nỉ", slug: "/nam/thoi-trang-hang-ngay/ao-ni", categoryTypeId: 2, parentId: 51 },
				{ id: 73, title: "Quần jeans", name: "Quần jeans", slug: "/nam/thoi-trang-hang-ngay/quan-jeans", categoryTypeId: 2, parentId: 51 },
				{ id: 74, title: "Quần shorts", name: "Quần shorts", slug: "/nam/thoi-trang-hang-ngay/quan-shorts", categoryTypeId: 2, parentId: 51 },
				{ id: 75, title: "Quần dài", name: "Quần dài", slug: "/nam/thoi-trang-hang-ngay/quan-dai", categoryTypeId: 2, parentId: 51 },
				{ id: 76, title: "Quần kaki", name: "Quần kaki", slug: "/nam/thoi-trang-hang-ngay/quan-kaki", categoryTypeId: 2, parentId: 51 },
				{ id: 79, title: "Áo khoác ngắn", name: "Áo khoác ngắn", slug: "/nam/thoi-trang-hang-ngay/ao-khoac-ngan", categoryTypeId: 2, parentId: 51 },
				{ id: 80, title: "Áo khoác gió", name: "Áo khoác gió", slug: "/nam/thoi-trang-hang-ngay/ao-khoac-gio", categoryTypeId: 2, parentId: 51 },
				{ id: 81, title: "Chống nắng", name: "Áo hống nắng", slug: "/nam/thoi-trang-hang-ngay/ao-chong-nang", categoryTypeId: 2, parentId: 51 },
				{
					id: 82,
					title: "Quần áo thể thao",
					name: "Quần áo thể thao",
					slug: "/nam/thoi-trang-hang-ngay/quan-ao-the-thao",
					categoryTypeId: 2,
					parentId: 51,
				},

				{ id: 83, title: "Bộ mặc nhà", name: "Bộ mặc nhà", slug: "/nam/do-mac-nha/bo-mac-nha", categoryTypeId: 2, parentId: 52 },
				{ id: 84, title: "Áo mặc nhà", name: "Áo mặc nhà", slug: "/nam/do-mac-nha/ao-mac-nha", categoryTypeId: 2, parentId: 52 },
				{ id: 85, title: "Quần mặc nhà", name: "Quần mặc nhà", slug: "/nam/do-mac-nha/quan-mac-nha", categoryTypeId: 2, parentId: 52 },

				{ id: 86, title: "Phụ kiện", name: "Phụ kiện", slug: "/nam/thoi-trang-thiet-yeu/phu-kien", categoryTypeId: 2, parentId: 53 },
				{ id: 87, title: "Đồ mặc trong", name: "Đồ mặc trong", slug: "/nam/thoi-trang-thiet-yeu/do-mac-trong", categoryTypeId: 2, parentId: 53 },
				{
					id: 88,
					title: "Đồ dùng cá nhân",
					name: "Đồ dùng cá nhân",
					slug: "/nam/thoi-trang-thiet-yeu/do-dung-ca-nhan",
					categoryTypeId: 2,
					parentId: 53,
				},
			],
		});
		// const categoryHeader = await db.category.create({
		// 	data: {
		// 		title: "Nữ",
		// 		name: "Nữ",
		// 		slug: "",
		// 		description: "Thời trang nữ | 1000+ mẫu quần áo nữ đẹp, mới nhất 2022",
		// 		categoryTypeId: categoryTypeCustomer.id,
		// 		parentId: null,
		// 	},
		// });
		// const categoryFemale = await db.category.create({
		// 	data: {
		// 		title: "Nữ",
		// 		name: "Nữ",
		// 		slug: "/nu",
		// 		description: "Thời trang nữ | 1000+ mẫu quần áo nữ đẹp, mới nhất 2022",
		// 		categoryTypeId: categoryTypeCustomer.id,
		// 		parentId: categoryHeader.id,
		// 	},
		// });
		// const categoryMale = await db.category.create({
		// 	data: {
		// 		title: "Nam",
		// 		name: "Nam",
		// 		slug: "/nam",
		// 		description: "Thời trang nam | 1000+ mẫu quần áo nam đẹp, mới nhất 2022",
		// 		categoryTypeId: categoryTypeCustomer.id,
		// 		parentId: categoryHeader.id,
		// 	},
		// });
		// const categoryGirl = await db.category.create({
		// 	data: {
		// 		title: "Bé gái",
		// 		name: "Bé gái",
		// 		slug: "/be-gai",
		// 		description: "Thời trang bé gái | 1000+ mẫu quần áo trẻ em nữ mới nhất 2022",
		// 		categoryTypeId: categoryTypeCustomer.id,
		// 		parentId: categoryHeader.id,
		// 	},
		// });
		// const categoryBoy = await db.category.create({
		// 	data: {
		// 		title: "Bé trai",
		// 		slug: "/be-trai",
		// 		name: "Bé trai",
		// 		description: "Thời trang bé trai | 1000+ mẫu quần áo trẻ em nam mới nhất 2022",
		// 		categoryTypeId: categoryTypeCustomer.id,
		// 		parentId: categoryHeader.id,
		// 	},
		// });
		// const categoryOutlet = await db.category.create({
		// 	data: {
		// 		title: "Outlet",
		// 		slug: "/outlet",
		// 		name: "Outlet",
		// 		description: "Canifa Outlet - Gian hàng Outlet chính hãng Canifa",
		// 		categoryTypeId: categoryTypeCollection.id,
		// 		parentId: categoryHeader.id,
		// 	},
		// });
		// const categoryNewArrivalFemale = await db.category.create({
		// 	data: {
		// 		title: "Sản phẩm mới",
		// 		slug: "/san-pham-moi-cho-nu",
		// 		name: "Sản phẩm mới cho nữ",
		// 		description: "Sản phẩm mới dành cho nữ 2022",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryFemale.id,
		// 	},
		// });
		// const categoryCanifaZFemale = await db.category.create({
		// 	data: {
		// 		title: "Canifa Z",
		// 		slug: "/canifa-z-nu",
		// 		name: "Canifa Z nữ",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryFemale.id,
		// 	},
		// });
		// const categoryEveryWearFemale = await db.category.create({
		// 	data: {
		// 		title: "Thời trang hàng ngày",
		// 		slug: "/thoi-trang-hang-ngay-nu",
		// 		name: "Thời trang hàng ngày cho nữ",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryFemale.id,
		// 	},
		// });
		// const categoryHomeWearFemale = await db.category.create({
		// 	data: {
		// 		title: "Đồ mặc nhà",
		// 		slug: "/do-mac-nha-nu",
		// 		name: "Đồ mặc nhà cho nữ",
		// 		description: "Đồ mặc nhà nữ | Quần áo mặc ở nhà hợp thời trang cho nữ",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryFemale.id,
		// 	},
		// });
		// const categoryNecessaryFemale = await db.category.create({
		// 	data: {
		// 		title: "Thời trang thiết yếu",
		// 		slug: "/thoi-trang-thiet-yeu-nu",
		// 		name: "Thời trang thiết yếu cho nữ",
		// 		description: "Thời trang thiết yếu",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryFemale.id,
		// 	},
		// });
		// const categoryGoodPriceFemale = await db.category.create({
		// 	data: {
		// 		title: "Sản phẩm giá tốt",
		// 		slug: "/san-pham-gia-tot-nu",
		// 		name: "Sản phẩm giá tốt cho nữ",
		// 		description: "Sản phẩm giá tốt",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryFemale.id,
		// 	},
		// });
		// const categorySaleFemale = await db.category.create({
		// 	data: {
		// 		title: "Giảm giá",
		// 		slug: "/san-pham-giam-gia-nu",
		// 		name: "Giảm giá cho nữ",
		// 		description: "Giảm giá",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryFemale.id,
		// 	},
		// });
		// const categoryAoThunFemale = await db.category.create({
		// 	data: {
		// 		title: "Áo phông",
		// 		name: "Áo phông nữ",
		// 		slug: "/ao-phong-nu",
		// 		description: "Áo thun nữ | Thời trang áo phông không cổ đẹp cho nữ 2022",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152398/canifa/simicategory_filename_tablet1639497541_wbcui8.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryAoPoloFemale = await db.category.create({
		// 	data: {
		// 		title: "Áo polo",
		// 		name: "Áo polo nữ",
		// 		slug: "/ao-polo-nu",
		// 		description: "Áo Polo nữ | BST áo polo có cổ đẹp cho nữ 2022",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152448/canifa/simicategory_filename_tablet1639497503_fkscvh.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryBoMacNhaFemale = await db.category.create({
		// 	data: {
		// 		title: "Bộ mặc nhà",
		// 		name: "Bộ mặc nhà nữ",
		// 		slug: "/bo-mac-nha-nu",
		// 		description: "50+ mẫu đồ bộ nữ đẹp để mặc nhà quanh năm 2021",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152549/canifa/simicategory_filename_tablet1639531301_tivgkc.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryVayLienThanFemale = await db.category.create({
		// 	data: {
		// 		title: "Váy liền thân",
		// 		name: "Váy liền thân nữ",
		// 		slug: "/vay-lien-than-nu",
		// 		description: "Đầm đẹp | 100+ mẫu váy liền thân để nàng xinh càng xinh",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152555/canifa/simicategory_filename_tablet1639530678_td46b7.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryQuanMacNhaFemale = await db.category.create({
		// 	data: {
		// 		title: "Quần mặc nhà",
		// 		name: "Quần mặc nhà nữ",
		// 		slug: "/quan-mac-nha-nu",
		// 		description: "50+ mẫu quần mặc nhà mùa hè &amp; mùa đông đẹp cho nữ 2021",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152561/canifa/simicategory_filename_tablet1629478506_he6zm0.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryAoMacNhaFemale = await db.category.create({
		// 	data: {
		// 		title: "Áo mặc nhà",
		// 		name: "Áo mặc nhà nữ",
		// 		slug: "/ao-mac-nha-nu",
		// 		description: "50+ mẫu áo mặc nhà mùa hè &amp; mùa đông đẹp cho nữ 2021",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152567/canifa/simicategory_filename_tablet1639530755_lvrunv.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryQuanShortFemale = await db.category.create({
		// 	data: {
		// 		title: "Quần short",
		// 		name: "Quần short nữ",
		// 		slug: "/quan-short-nu",
		// 		description: "Quần short nữ | 100+ mẫu quần sooc/quần đùi đẹp cho nữ 2022",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152572/canifa/simicategory_filename_tablet1639530445_gealj2.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryAoSoMiFemale = await db.category.create({
		// 	data: {
		// 		title: "Áo sơ mi",
		// 		name: "Áo sơ mi nữ",
		// 		slug: "/ao-so-mi-nu",
		// 		description: "250+ kiểu áo sơ mi nữ mặc đẹp hàng ngày và tới công sở",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152578/canifa/simicategory_filename_tablet1639530445_sarm8k.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryQuanJeanFemale = await db.category.create({
		// 	data: {
		// 		title: "Quần jean",
		// 		name: "Quần jean nữ",
		// 		slug: "/quan-jean-nu",
		// 		description: "Quần jean nữ | 120+ mẫu quần bò đẹp cho nữ 2022",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152583/canifa/simicategory_filename_tablet1639530476_rhcjuf.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryQuanDaiFemale = await db.category.create({
		// 	data: {
		// 		title: "Quần dài",
		// 		name: "Quần dài nữ",
		// 		slug: "/quan-dai-nu",
		// 		description: "QUẦN TÂY NỮ | 30+ Mẫu quần vải dài nữ đẹp cho dân công sở 2022",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152587/canifa/simicategory_filename_tablet1639530534_m2oyew.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryChongNangFemale = await db.category.create({
		// 	data: {
		// 		title: "Chống nắng",
		// 		name: "Chống nắng nữ",
		// 		slug: "/chong-nang-nu",
		// 		description: "BST Áo khoác chống nắng &amp; tia UV cao cấp cho nữ 2022",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152595/canifa/simicategory_filename_tablet1629479055_sqnsxj.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const categoryChanVayFemale = await db.category.create({
		// 	data: {
		// 		title: "Chân váy",
		// 		name: "Chân váy nữ",
		// 		slug: "/chan-vay-nu",
		// 		description: "150+ mẫu chân váy xinh mặc đẹp hàng ngày và tới công sở",
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152591/canifa/simicategory_filename_tablet1639531166_lts7yi.png",
		// 		categoryTypeId: categoryTypeProductFilter.id,
		// 		parentId: categoryEveryWearFemale.id,
		// 	},
		// });
		// const aoThunFemale1 = await createProduct(
		// 	{
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660154110/canifa/5tl22s002-sr079-2-thumb_vhyzdz.jpg",
		// 		name: "Áo phông unisex người lớn",
		// 		price: 299000,
		// 		newPrice: 0,
		// 		slug: "ao-phong-unisex-nguoi-lon",
		// 	},
		// 	[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
		// 	[variantValueRed],
		// 	[variantValueS, variantValueM, variantValueL, variantValueXL]
		// );
		// const aoThunFemale2 = await createProduct(
		// 	{
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660178542/canifa/6ts22a001-sy224-2-thumb_y9fezo.jpg",
		// 		name: "Áo phông nữ",
		// 		price: 129000,
		// 		newPrice: 0,
		// 		slug: "ao-phong-nu-1",
		// 	},
		// 	[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
		// 	[variantValueYellow, variantValueBlack, variantValuePink],
		// 	[variantValueS, variantValueM, variantValueL, variantValueXL],
		// 	[
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660178975/canifa/6ts22a001-sy224-1_fktv2c.jpg",
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179024/canifa/6ts22a001-sk010-1_iiay6e.jpg",
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179036/canifa/6ts22a001-sm030-1_fhcyc9.jpg",
		// 	]
		// );
		// const aoThunFemale3 = await createProduct(
		// 	{
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179179/canifa/6ts22a002-sm378-2-thumb_vph1ki.jpg",
		// 		name: "Áo phông nữ",
		// 		price: 129000,
		// 		newPrice: 0,
		// 		slug: "ao-phong-nu-2",
		// 	},
		// 	[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
		// 	[variantValueBlack, variantValuePink, variantValueRed],
		// 	[variantValueS, variantValueM, variantValueL, variantValueXL],
		// 	[
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179234/canifa/6ts22a002-sk010-1_pvcus8.jpg",
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179257/canifa/6ts22a002-sm066-1_cdp0js.jpg",
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179269/canifa/6ts22a002-sr112-1_stfreh.jpg",
		// 	]
		// );
		// const aoThunFemale4 = await createProduct(
		// 	{
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179352/canifa/6ts22s047-sw001-2-thumb_allxeu.jpg",
		// 		name: "Áo phông nữ in hình",
		// 		price: 269000,
		// 		newPrice: 0,
		// 		slug: "ao-phong-nu-in-hinh-1",
		// 	},
		// 	[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
		// 	[variantValueWhite],
		// 	[variantValueS, variantValueM, variantValueL, variantValueXL]
		// );
		// const aoThunFemale5 = await createProduct(
		// 	{
		// 		thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179593/canifa/6ta22s002-sn235-2-thumb_zbxs2v.jpg",
		// 		name: "Áo ba lỗ nữ",
		// 		price: 249000,
		// 		newPrice: 199000,
		// 		slug: "ao-ba-lo-nu-1",
		// 	},
		// 	[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale, categorySaleFemale],
		// 	[variantValueLightBlue, variantValueBrown, variantValueBlack, variantValueWhite],
		// 	[variantValueS, variantValueM, variantValueL, variantValueXL],
		// 	[
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179708/canifa/6ta22s002-sb983-m-1-u_qpiwdt.jpg",
		// 		"https://canifa.com/img/1000/1500/resize/6/t/6ta22s002-sn235-1.jpg",
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179736/canifa/6ta22s002-sk010-1_xmnolk.jpg",
		// 		"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179765/canifa/6ta22s002-sw001-1_howtqm.jpg",
		// 	]
		// );
		await createMetaBanner();
	} catch (error) {
		console.log(error);
	}
};

async function createMetaBanner() {
	const metaBannerHomePage = await db.meta.create({
		data: {
			name: "Banner Home Page",
			description: "",
		},
	});
	const metaBannerSaleForYou = await db.meta.create({
		data: {
			name: "Banner Sale For You",
			description: "",
		},
	});
	const metaBannerGoodPriceProduct = await db.meta.create({
		data: {
			name: "Banner Good Price Product",
			description: "",
		},
	});
	const metaBannerSectionProductStyleAtHome = await db.meta.create({
		data: {
			name: "Banner Section Product Style At Home",
			description: "",
		},
	});
	const metaBannerCanifaZ = await db.meta.create({
		data: {
			name: "Banner Canifa Z",
			description: "",
		},
	});
	const metaBannerSectionProductAoPhong = await db.meta.create({
		data: {
			name: "Banner Section Product Ao Phong",
			description: "",
		},
	});
	const metaBannerSectionProductFamily = await db.meta.create({
		data: {
			name: "Banner Section Product Family",
			description: "",
		},
	});
	const metaBannerQuanJeans = await db.meta.create({
		data: {
			name: "Banner Section Product Quan Jean",
			description: "",
		},
	});

	await db.banner.createMany({
		data: [
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663194/canifa/banner/banner_name_tablet1660097445_pl3beg.jpg",
				slug: "ao-den-truong",
				description: "",
				metaId: metaBannerHomePage.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663442/canifa/banner/list_image_tablet1660064322_f5nxmx.jpg",
				slug: "bo-mac-nha",
				description: "",
				metaId: metaBannerSaleForYou.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663452/canifa/banner/list_image_tablet_second1659682994_ynhlrl.jpg",
				slug: "vay-me-va-be",
				description: "",
				metaId: metaBannerSaleForYou.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663501/canifa/banner/list_image_tablet1646719696_wqzr9u.jpg",
				slug: "san-pham-gia-tot",
				description: "",
				metaId: metaBannerGoodPriceProduct.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663663/canifa/banner/list_image_tablet1650513698_zbbwsw.png",
				slug: "bst-bo-mac-nha",
				description: "",
				metaId: metaBannerSectionProductStyleAtHome.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663672/canifa/banner/list_image_tablet_second1650513698_gljxvo.png",
				slug: "bst-bo-mac-nha",
				description: "",
				metaId: metaBannerSectionProductStyleAtHome.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663649/canifa/banner/list_image_tablet_third1650513698_lzurin.png",
				slug: "bst-bo-mac-nha",
				description: "",
				metaId: metaBannerSectionProductStyleAtHome.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663788/canifa/banner/list_image_tablet1660630981_dl9zad.jpg",
				slug: "canifa-z",
				description: "",
				metaId: metaBannerCanifaZ.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663869/canifa/banner/list_image_tablet1649392540_fltjx2.png",
				slug: "ao-phong",
				description: "",
				metaId: metaBannerSectionProductAoPhong.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663885/canifa/banner/list_image_tablet_second1649392540_il43l4.png",
				slug: "ao-phong",
				description: "",
				metaId: metaBannerSectionProductAoPhong.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660663918/canifa/banner/list_image_tablet_third1649392540_hkbs9v.png",
				slug: "ao-phong",
				description: "",
				metaId: metaBannerSectionProductAoPhong.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660664049/canifa/banner/list_image_tablet1651737068_fz1s99.png",
				slug: "bst-gia-dinh",
				description: "",
				metaId: metaBannerSectionProductFamily.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660664075/canifa/banner/list_image_tablet_second1651737068_fawi3q.png",
				slug: "bst-gia-dinh",
				description: "",
				metaId: metaBannerSectionProductFamily.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660664096/canifa/banner/list_image_tablet_third1651737068_nnmelw.png",
				slug: "bst-gia-dinh",
				description: "",
				metaId: metaBannerSectionProductFamily.id,
				isShow: true,
			},
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660664130/canifa/banner/list_image_tablet1650248471_emxfuw.jpg",
				slug: "quan-jeans",
				description: "",
				metaId: metaBannerQuanJeans.id,
				isShow: true,
			},
		],
	});
}

const createProduct = async (data: any, categories: any, variantValues1: any, variantValues2: any, imgs?: any) => {
	const product = await db.product.create({
		data,
	});
	await db.productCategory.createMany({
		data: categories.map((item: any) => ({
			productId: product.id,
			categoryId: item.id,
		})),
	});
	for (let i = 0; i < variantValues1.length; i++) {
		for (let j = 0; j < variantValues2.length; j++) {
			const productOption = await db.productOption.create({
				data: {
					title: `${variantValues1[i].name} / ${variantValues2[j].name}`,
					sku: "" + product.id + variantValues1[i].id + variantValues2[j].id,
					weight: 50,
					amount: 11,
					productId: product.id,
					...(imgs && i < imgs.length ? { thumbnail: imgs[i] } : {}),
				},
			});
			await db.productOptionValue.createMany({
				data: [
					{
						productOptionId: productOption.id,
						variantValueId: variantValues1[i].id,
					},
					{
						productOptionId: productOption.id,
						variantValueId: variantValues2[j].id,
					},
				],
			});
		}
	}
	return product;
};

seed();

export default seed;
