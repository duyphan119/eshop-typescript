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
				avatar: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660325512/canifa/avatar/himxs3vbqbyllvqanojp.jpg",
				phone: "0385981196",
			},
		});
		const user1 = await db.user.create({
			data: {
				fullName: "Phan Khánh Duy",
				email: "duy.90@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$4wKZKsm7Y/mpQiPoSZbB5g$R0QZxzjb8zjXDP8bsl+7uYUHAXu4qSpUXCpl+K3TvSk",
				avatar: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660325268/canifa/avatar/sl7z0l330zkuwgom2edu.jpg",
				phone: "0359811123",
			},
		});
		const user2 = await db.user.create({
			data: {
				fullName: "Nguyễn Anh Hùng",
				email: "user8@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$7dWyi3wtFHxoLmw2QCTYoA$hlALg7vD8TrIwA8AWKxsdhantOYAeY5HlouQyVr+syE",
				avatar: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660325221/canifa/avatar/x5bw0dd4zdqesgn73l6n.jpg",
				phone: "0325689174",
			},
		});
		const user3 = await db.user.create({
			data: {
				fullName: "Nguyễn Thị Thu Hương",
				email: "ntth123@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$CfjO6Uhg/YmGdmaD3IKRWA$XeM0/3WDzHjF3nlX5bN5yIet4EEF7Uuwdb0FCJ3HXr8",
				avatar: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660322123/canifa/avatar/yktig9ahcmiscun5zpkh.jpg",
				phone: "0385181196",
			},
		});
		const user4 = await db.user.create({
			data: {
				fullName: "Phạm Thanh Long",
				email: "ptl123@gmail.com",
				hash: "$argon2id$v=19$m=4096,t=3,p=1$7gaEHr53BsqHuv1SrTAJ+w$vgCtZVG6aNv1qv8nmXDbtzltxDpoNUEoLVLAdcXaGDw",
				avatar: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660323920/canifa/avatar/lgnuejcggbetlwhsyqan.jpg",
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
		const variantColor = await db.variant.create({
			data: {
				name: "Màu sắc",
			},
		});
		const variantSize = await db.variant.create({
			data: {
				name: "Kích cỡ",
			},
		});
		const variantValueBlack = await db.variantValue.create({
			data: {
				name: "Black",
				variantId: variantColor.id,
			},
		});
		const variantValueWhite = await db.variantValue.create({
			data: {
				name: "White",
				variantId: variantColor.id,
			},
		});
		const variantValuePurple = await db.variantValue.create({
			data: {
				name: "Purple",
				variantId: variantColor.id,
			},
		});
		const variantValueRed = await db.variantValue.create({
			data: {
				name: "Red",
				variantId: variantColor.id,
			},
		});
		const variantValuePink = await db.variantValue.create({
			data: {
				name: "Pink",
				variantId: variantColor.id,
			},
		});
		const variantValueBlue = await db.variantValue.create({
			data: {
				name: "Blue",
				variantId: variantColor.id,
			},
		});
		const variantValueGray = await db.variantValue.create({
			data: {
				name: "Gray",
				variantId: variantColor.id,
			},
		});
		const variantValueBrown = await db.variantValue.create({
			data: {
				name: "Brown",
				variantId: variantColor.id,
			},
		});
		const variantValueLightBlue = await db.variantValue.create({
			data: {
				name: "LightBlue",
				variantId: variantColor.id,
			},
		});
		const variantValueGreen = await db.variantValue.create({
			data: {
				name: "Green",
				variantId: variantColor.id,
			},
		});
		const variantValueOrange = await db.variantValue.create({
			data: {
				name: "Orange",
				variantId: variantColor.id,
			},
		});
		const variantValueYellow = await db.variantValue.create({
			data: {
				name: "Yellow",
				variantId: variantColor.id,
			},
		});
		const variantValue100 = await db.variantValue.create({
			data: {
				name: "100",
				variantId: variantSize.id,
			},
		});
		const variantValue110 = await db.variantValue.create({
			data: {
				name: "110",
				variantId: variantSize.id,
			},
		});
		const variantValue120 = await db.variantValue.create({
			data: {
				name: "120",
				variantId: variantSize.id,
			},
		});
		const variantValue130 = await db.variantValue.create({
			data: {
				name: "130",
				variantId: variantSize.id,
			},
		});
		const variantValue140 = await db.variantValue.create({
			data: {
				name: "140",
				variantId: variantSize.id,
			},
		});
		const variantValue150 = await db.variantValue.create({
			data: {
				name: "150",
				variantId: variantSize.id,
			},
		});
		const variantValue160 = await db.variantValue.create({
			data: {
				name: "160",
				variantId: variantSize.id,
			},
		});
		const variantValueS = await db.variantValue.create({
			data: {
				name: "S",
				variantId: variantSize.id,
			},
		});
		const variantValueM = await db.variantValue.create({
			data: {
				name: "M",
				variantId: variantSize.id,
			},
		});
		const variantValueL = await db.variantValue.create({
			data: {
				name: "L",
				variantId: variantSize.id,
			},
		});
		const variantValueXL = await db.variantValue.create({
			data: {
				name: "XL",
				variantId: variantSize.id,
			},
		});
		const variantValue2XL = await db.variantValue.create({
			data: {
				name: "2XL",
				variantId: variantSize.id,
			},
		});
		const variantValue3XL = await db.variantValue.create({
			data: {
				name: "3XL",
				variantId: variantSize.id,
			},
		});
		const variantValue4XL = await db.variantValue.create({
			data: {
				name: "4XL",
				variantId: variantSize.id,
			},
		});
		const categoryTypeGroupProduct = await db.categoryType.create({
			data: {
				name: "Nhóm sản phẩm",
			},
		});
		const categoryTypeProduct = await db.categoryType.create({
			data: {
				name: "Sản phẩm",
			},
		});
		const categoryTypeAllGroupProducts = await db.categoryType.create({
			data: {
				name: "Tất cả nhóm sản phẩm",
			},
		});
		const categoryFemale = await db.category.create({
			data: {
				title: "Nữ",
				name: "Nữ",
				slug: "nu",
				description: "Thời trang nữ | 1000+ mẫu quần áo nữ đẹp, mới nhất 2022",
				categoryTypeId: categoryTypeGroupProduct.id,
				parentId: null,
			},
		});
		const categoryMale = await db.category.create({
			data: {
				title: "Nam",
				name: "Nam",
				slug: "nam",
				description: "Thời trang nam | 1000+ mẫu quần áo nam đẹp, mới nhất 2022",
				categoryTypeId: categoryTypeGroupProduct.id,
				parentId: null,
			},
		});
		const categoryGirl = await db.category.create({
			data: {
				title: "Bé gái",
				name: "Bé gái",
				slug: "be-gai",
				description: "Thời trang bé gái | 1000+ mẫu quần áo trẻ em nữ mới nhất 2022",
				categoryTypeId: categoryTypeGroupProduct.id,
				parentId: null,
			},
		});
		const categoryBoy = await db.category.create({
			data: {
				title: "Bé trai",
				slug: "be-trai",
				name: "Bé trai",
				description: "Thời trang bé trai | 1000+ mẫu quần áo trẻ em nam mới nhất 2022",
				categoryTypeId: categoryTypeGroupProduct.id,
				parentId: null,
			},
		});
		const categoryOutlet = await db.category.create({
			data: {
				title: "Outlet",
				slug: "Outlet",
				name: "Outlet",
				description: "Canifa Outlet - Gian hàng Outlet chính hãng Canifa",
				categoryTypeId: categoryTypeAllGroupProducts.id,
				parentId: null,
			},
		});
		const categoryNewArrivalFemale = await db.category.create({
			data: {
				title: "Sản phẩm mới",
				slug: "san-pham-moi-cho-nu",
				name: "Sản phẩm mới cho nữ",
				description: "Sản phẩm mới dành cho nữ 2022",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryFemale.id,
			},
		});
		const categoryCanifaZFemale = await db.category.create({
			data: {
				title: "Canifa Z",
				slug: "canifa-z-nu",
				name: "Canifa Z nữ",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryFemale.id,
			},
		});
		const categoryEveryWearFemale = await db.category.create({
			data: {
				title: "Thời trang hàng ngày",
				slug: "thoi-trang-hang-ngay-nu",
				name: "Thời trang hàng ngày cho nữ",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryFemale.id,
			},
		});
		const categoryHomeWearFemale = await db.category.create({
			data: {
				title: "Đồ mặc nhà",
				slug: "do-mac-nha-nu",
				name: "Đồ mặc nhà cho nữ",
				description: "Đồ mặc nhà nữ | Quần áo mặc ở nhà hợp thời trang cho nữ",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryFemale.id,
			},
		});
		const categoryNecessaryFemale = await db.category.create({
			data: {
				title: "Thời trang thiết yếu",
				slug: "thoi-trang-thiet-yeu-nu",
				name: "Thời trang thiết yếu cho nữ",
				description: "Thời trang thiết yếu",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryFemale.id,
			},
		});
		const categoryGoodPriceFemale = await db.category.create({
			data: {
				title: "Sản phẩm giá tốt",
				slug: "san-pham-gia-tot-nu",
				name: "Sản phẩm giá tốt cho nữ",
				description: "Sản phẩm giá tốt",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryFemale.id,
			},
		});
		const categorySaleFemale = await db.category.create({
			data: {
				title: "Giảm giá",
				slug: "san-pham-giam-gia-nu",
				name: "Giảm giá cho nữ",
				description: "Giảm giá",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryFemale.id,
			},
		});
		const categoryAoThunFemale = await db.category.create({
			data: {
				title: "Áo phông",
				name: "Áo phông nữ",
				slug: "ao-phong-nu",
				description: "Áo thun nữ | Thời trang áo phông không cổ đẹp cho nữ 2022",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152398/canifa/simicategory_filename_tablet1639497541_wbcui8.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryAoPoloFemale = await db.category.create({
			data: {
				title: "Áo polo",
				name: "Áo polo nữ",
				slug: "ao-polo-nu",
				description: "Áo Polo nữ | BST áo polo có cổ đẹp cho nữ 2022",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152448/canifa/simicategory_filename_tablet1639497503_fkscvh.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryBoMacNhaFemale = await db.category.create({
			data: {
				title: "Bộ mặc nhà",
				name: "Bộ mặc nhà nữ",
				slug: "bo-mac-nha-nu",
				description: "50+ mẫu đồ bộ nữ đẹp để mặc nhà quanh năm 2021",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152549/canifa/simicategory_filename_tablet1639531301_tivgkc.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryVayLienThanFemale = await db.category.create({
			data: {
				title: "Váy liền thân",
				name: "Váy liền thân nữ",
				slug: "vay-lien-than-nu",
				description: "Đầm đẹp | 100+ mẫu váy liền thân để nàng xinh càng xinh",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152555/canifa/simicategory_filename_tablet1639530678_td46b7.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryQuanMacNhaFemale = await db.category.create({
			data: {
				title: "Quần mặc nhà",
				name: "Quần mặc nhà nữ",
				slug: "quan-mac-nha-nu",
				description: "50+ mẫu quần mặc nhà mùa hè &amp; mùa đông đẹp cho nữ 2021",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152561/canifa/simicategory_filename_tablet1629478506_he6zm0.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryAoMacNhaFemale = await db.category.create({
			data: {
				title: "Áo mặc nhà",
				name: "Áo mặc nhà nữ",
				slug: "ao-mac-nha-nu",
				description: "50+ mẫu áo mặc nhà mùa hè &amp; mùa đông đẹp cho nữ 2021",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152567/canifa/simicategory_filename_tablet1639530755_lvrunv.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryQuanShortFemale = await db.category.create({
			data: {
				title: "Quần short",
				name: "Quần short nữ",
				slug: "quan-short-nu",
				description: "Quần short nữ | 100+ mẫu quần sooc/quần đùi đẹp cho nữ 2022",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152572/canifa/simicategory_filename_tablet1639530445_gealj2.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryAoSoMiFemale = await db.category.create({
			data: {
				title: "Áo sơ mi",
				name: "Áo sơ mi nữ",
				slug: "ao-so-mi-nu",
				description: "250+ kiểu áo sơ mi nữ mặc đẹp hàng ngày và tới công sở",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152578/canifa/simicategory_filename_tablet1639530445_sarm8k.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryQuanJeanFemale = await db.category.create({
			data: {
				title: "Quần jean",
				name: "Quần jean nữ",
				slug: "quan-jean-nu",
				description: "Quần jean nữ | 120+ mẫu quần bò đẹp cho nữ 2022",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152583/canifa/simicategory_filename_tablet1639530476_rhcjuf.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryQuanDaiFemale = await db.category.create({
			data: {
				title: "Quần dài",
				name: "Quần dài nữ",
				slug: "quan-dai-nu",
				description: "QUẦN TÂY NỮ | 30+ Mẫu quần vải dài nữ đẹp cho dân công sở 2022",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152587/canifa/simicategory_filename_tablet1639530534_m2oyew.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryChongNangFemale = await db.category.create({
			data: {
				title: "Chống nắng",
				name: "Chống nắng nữ",
				slug: "chong-nang-nu",
				description: "BST Áo khoác chống nắng &amp; tia UV cao cấp cho nữ 2022",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152595/canifa/simicategory_filename_tablet1629479055_sqnsxj.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const categoryChanVayFemale = await db.category.create({
			data: {
				title: "Chân váy",
				name: "Chân váy nữ",
				slug: "chan-vay-nu",
				description: "150+ mẫu chân váy xinh mặc đẹp hàng ngày và tới công sở",
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660152591/canifa/simicategory_filename_tablet1639531166_lts7yi.png",
				categoryTypeId: categoryTypeProduct.id,
				parentId: categoryEveryWearFemale.id,
			},
		});
		const aoThunFemale1 = await createProduct(
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660154110/canifa/5tl22s002-sr079-2-thumb_vhyzdz.jpg",
				name: "Áo phông unisex người lớn",
				price: 299000,
				newPrice: 0,
				slug: "ao-phong-unisex-nguoi-lon",
			},
			[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
			[variantValueRed],
			[variantValueS, variantValueM, variantValueL, variantValueXL]
		);
		const aoThunFemale2 = await createProduct(
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660178542/canifa/6ts22a001-sy224-2-thumb_y9fezo.jpg",
				name: "Áo phông nữ",
				price: 129000,
				newPrice: 0,
				slug: "ao-phong-nu-1",
			},
			[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
			[variantValueYellow, variantValueBlack, variantValuePink],
			[variantValueS, variantValueM, variantValueL, variantValueXL],
			[
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660178975/canifa/6ts22a001-sy224-1_fktv2c.jpg",
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179024/canifa/6ts22a001-sk010-1_iiay6e.jpg",
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179036/canifa/6ts22a001-sm030-1_fhcyc9.jpg",
			]
		);
		const aoThunFemale3 = await createProduct(
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179179/canifa/6ts22a002-sm378-2-thumb_vph1ki.jpg",
				name: "Áo phông nữ",
				price: 129000,
				newPrice: 0,
				slug: "ao-phong-nu-2",
			},
			[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
			[variantValueBlack, variantValuePink, variantValueRed],
			[variantValueS, variantValueM, variantValueL, variantValueXL],
			[
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179234/canifa/6ts22a002-sk010-1_pvcus8.jpg",
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179257/canifa/6ts22a002-sm066-1_cdp0js.jpg",
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179269/canifa/6ts22a002-sr112-1_stfreh.jpg",
			]
		);
		const aoThunFemale4 = await createProduct(
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179352/canifa/6ts22s047-sw001-2-thumb_allxeu.jpg",
				name: "Áo phông nữ in hình",
				price: 269000,
				newPrice: 0,
				slug: "ao-phong-nu-in-hinh-1",
			},
			[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale],
			[variantValueWhite],
			[variantValueS, variantValueM, variantValueL, variantValueXL]
		);
		const aoThunFemale5 = await createProduct(
			{
				thumbnail: "https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179593/canifa/6ta22s002-sn235-2-thumb_zbxs2v.jpg",
				name: "Áo ba lỗ nữ",
				price: 249000,
				newPrice: 199000,
				slug: "ao-ba-lo-nu-1",
			},
			[categoryFemale, categoryNewArrivalFemale, categoryEveryWearFemale, categoryAoThunFemale, categorySaleFemale],
			[variantValueLightBlue, variantValueBrown, variantValueBlack, variantValueWhite],
			[variantValueS, variantValueM, variantValueL, variantValueXL],
			[
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179708/canifa/6ta22s002-sb983-m-1-u_qpiwdt.jpg",
				"https://canifa.com/img/1000/1500/resize/6/t/6ta22s002-sn235-1.jpg",
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179736/canifa/6ta22s002-sk010-1_xmnolk.jpg",
				"https://res.cloudinary.com/dwhjftwvw/image/upload/v1660179765/canifa/6ta22s002-sw001-1_howtqm.jpg",
			]
		);
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
					title: `${variantValues1[i].name} ${variantValues2[j].name}`,
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
