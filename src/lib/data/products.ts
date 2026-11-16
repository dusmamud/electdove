export type Review = {
	name: string;
	rating: number;
	date: string;
	title: string;
	text: string;
	/** Demo seed count of "helpful" votes for this review. */
	helpful?: number;
};

export type QA = { q: string; a: string };

export type Product = {
	id: number;
	name: string;
	price: number;
	oldPrice: number;
	rating: number;
	reviews: number;
	category: string;
	stock: number;
	/** Short badge shown on the landing grid, e.g. "New" or "Best Seller". */
	tag?: string;
	desc: string;
	/** AI-generated product photo in /static */
	src: string;
	/** Gallery: main photo + alternate angles (Electdove has one photo per product) */
	images: string[];
	highlights: string[];
	specs: { label: string; value: string }[];
	/** Single variant group (buttons, not a dropdown) */
	option: { label: string; choices: string[]; priceDeltas?: number[] };
	seedReviews: Review[];
	qa: QA[];
};

export const products: Product[] = [
	{
		id: 1,
		name: 'iPhone 15 Pro',
		price: 119900,
		oldPrice: 134900,
		rating: 4.8,
		reviews: 214,
		category: 'Smartphones',
		stock: 12,
		desc: 'Titanium design, A17 Pro chip and a 48MP Pro camera system. The lightest Pro iPhone ever, with a USB-C port, Action Button and all-day battery life.',
		src: '/phone-iphone15pro.webp',
		images: ['/phone-iphone15pro.webp'],
		highlights: [
			'A17 Pro chip — the fastest chip in a smartphone',
			'Aerospace-grade titanium, just 187 g',
			'48MP main camera with 3x telephoto and ProRAW',
			'USB-C with USB 3 speeds, Action Button, 5G'
		],
		specs: [
			{ label: 'Display', value: '6.1" Super Retina XDR, ProMotion 120 Hz' },
			{ label: 'Chip', value: 'A17 Pro with 6-core GPU' },
			{ label: 'Camera', value: '48MP main + 12MP ultra wide + 12MP telephoto' },
			{ label: 'Battery', value: 'Up to 23 hours video playback' },
			{ label: 'Connectivity', value: '5G, Wi-Fi 6E, Bluetooth 5.3, USB-C' },
			{ label: 'In the box', value: 'iPhone, USB-C cable, documentation' }
		],
		option: { label: 'Storage', choices: ['128GB', '256GB', '512GB'], priceDeltas: [0, 10000, 20000] },
		seedReviews: [
			{
				name: 'Rohan K.',
				rating: 5,
				helpful: 14,
				date: 'Nov 8, 2026',
				title: 'The titanium build is a game changer',
				text: 'Noticeably lighter than my old Pro, and the camera is superb in low light. Battery easily gets me through a full day of heavy use.'
			},
			{
				name: 'Priya S.',
				rating: 4,
				helpful: 6,
				date: 'Oct 22, 2026',
				title: 'Great phone, pricey as always',
				text: 'Everything is fast and the Action Button is handy. Wish it came with a charger in the box, but the phone itself is excellent.'
			}
		],
		qa: [
			{
				q: 'Does it come with a charger?',
				a: 'A USB-C cable is included. You can charge with any USB-C power adapter (20W or higher recommended for fast charging).'
			},
			{
				q: 'Is the iPhone 15 Pro water resistant?',
				a: 'Yes, it is rated IP68 — it can handle splashes, rain and brief submersion in up to 6 metres of water for 30 minutes.'
			}
		]
	},
	{
		id: 2,
		name: 'Google Pixel 8 Pro',
		price: 99999,
		oldPrice: 106999,
		rating: 4.7,
		reviews: 186,
		category: 'Smartphones',
		stock: 15,
		desc: 'Google Tensor G3, the smartest Pixel camera yet and seven years of updates. Magic Eraser, Best Take and Night Sight make every photo look effortless.',
		src: '/phone-pixel8pro.webp',
		images: ['/phone-pixel8pro.webp'],
		highlights: [
			'Google Tensor G3 with on-device AI features',
			'Pro camera: 50MP main, 48MP ultrawide, 48MP telephoto',
			'7 years of OS, security and feature updates',
			'6.7" Super Actua display, 5050 mAh battery'
		],
		specs: [
			{ label: 'Display', value: '6.7" Super Actua LTPO OLED, 120 Hz' },
			{ label: 'Chip', value: 'Google Tensor G3 with Titan M2' },
			{ label: 'Camera', value: '50MP main + 48MP ultrawide + 48MP telephoto (30x zoom)' },
			{ label: 'Battery', value: '5050 mAh, 30W wired / 23W wireless charging' },
			{ label: 'Updates', value: '7 years of OS and security updates' },
			{ label: 'In the box', value: 'Pixel 8 Pro, USB-C cable, Quick Switch adapter' }
		],
		option: { label: 'Storage', choices: ['128GB', '256GB', '512GB'], priceDeltas: [0, 10000, 20000] },
		seedReviews: [
			{
				name: 'Aarav M.',
				rating: 5,
				helpful: 11,
				date: 'Nov 5, 2026',
				title: 'Best camera on any phone I have used',
				text: 'Night Sight is unreal and Magic Eraser actually works. The clean Android experience with seven years of updates sealed it for me.'
			},
			{
				name: 'Neha T.',
				rating: 4,
				helpful: 4,
				date: 'Oct 19, 2026',
				title: 'Smart, fast, great photos',
				text: 'Call screening and the AI features are genuinely useful. Charging is a bit slower than rivals, but the battery lasts all day.'
			}
		],
		qa: [
			{
				q: 'How long will the Pixel 8 Pro get updates?',
				a: 'Google promises seven years of OS updates, security patches and feature drops from launch.'
			},
			{
				q: 'Does it support wireless charging?',
				a: 'Yes, up to 23W wireless charging with a Pixel Stand (2nd gen) and 12W with standard Qi chargers.'
			}
		]
	},
	{
		id: 3,
		name: 'Samsung Galaxy S24 Ultra',
		price: 119999,
		oldPrice: 134999,
		rating: 4.8,
		reviews: 243,
		category: 'Smartphones',
		stock: 10,
		desc: 'Galaxy AI, a 200MP camera and the built-in S Pen. Titanium frame, flat 6.8" display and a battery that easily lasts two days of normal use.',
		src: '/product-galaxy.webp',
		images: ['/product-galaxy.webp'],
		highlights: [
			'Galaxy AI: Live Translate, Circle to Search, Note Assist',
			'200MP camera with 100x Space Zoom',
			'Built-in S Pen for notes, sketches and remote control',
			'Titanium frame, 5000 mAh battery'
		],
		specs: [
			{ label: 'Display', value: '6.8" Dynamic AMOLED 2X, 120 Hz, 2600 nits' },
			{ label: 'Chip', value: 'Snapdragon 8 Gen 3 for Galaxy' },
			{ label: 'Camera', value: '200MP main + 50MP tele + 12MP ultrawide + 10MP tele' },
			{ label: 'Battery', value: '5000 mAh, 45W wired / 15W wireless charging' },
			{ label: 'S Pen', value: 'Built-in, 2.8 ms latency' },
			{ label: 'In the box', value: 'Galaxy S24 Ultra, S Pen, USB-C cable' }
		],
		option: { label: 'Storage', choices: ['256GB', '512GB', '1TB'], priceDeltas: [0, 15000, 30000] },
		seedReviews: [
			{
				name: 'Vikram R.',
				rating: 5,
				helpful: 18,
				date: 'Nov 9, 2026',
				title: 'The S Pen alone is worth it',
				text: 'I take all my meeting notes on this phone. The 200MP camera is ridiculous in daylight, and the battery goes two days without trying.'
			},
			{
				name: 'Sara L.',
				rating: 5,
				helpful: 7,
				date: 'Oct 28, 2026',
				title: 'Big, fast, and the AI is actually useful',
				text: 'Live Translate on calls works shockingly well. The flat screen is a big improvement — no more accidental edge touches.'
			}
		],
		qa: [
			{
				q: 'Does the S Pen come in the box?',
				a: 'Yes, the S Pen is built into the phone and included — no separate purchase needed.'
			},
			{
				q: 'Is there a microSD slot?',
				a: 'No, storage is not expandable. Choose the 512GB or 1TB model if you shoot a lot of video.'
			}
		]
	},
	{
		id: 4,
		name: 'iPhone 14',
		price: 64900,
		oldPrice: 79900,
		rating: 4.6,
		reviews: 158,
		category: 'Smartphones',
		stock: 18,
		desc: 'A15 Bionic power, a superb dual-camera system and all-day battery. The sweet spot of the iPhone line-up — everything most people need, for less.',
		src: '/phone-iphone14.webp',
		images: ['/phone-iphone14.webp'],
		highlights: [
			'A15 Bionic chip — still fast for anything you throw at it',
			'12MP dual camera with Night mode and Cinematic mode',
			'Ceramic Shield front, IP68 water resistance',
			'Up to 20 hours video playback'
		],
		specs: [
			{ label: 'Display', value: '6.1" Super Retina XDR OLED' },
			{ label: 'Chip', value: 'A15 Bionic with 5-core GPU' },
			{ label: 'Camera', value: '12MP main + 12MP ultra wide' },
			{ label: 'Battery', value: 'Up to 20 hours video playback' },
			{ label: 'Connectivity', value: '5G, Wi-Fi 6, Bluetooth 5.3, Lightning' },
			{ label: 'In the box', value: 'iPhone, USB-C to Lightning cable' }
		],
		option: { label: 'Storage', choices: ['128GB', '256GB', '512GB'], priceDeltas: [0, 10000, 20000] },
		seedReviews: [
			{
				name: 'Kabir D.',
				rating: 5,
				helpful: 9,
				date: 'Nov 2, 2026',
				title: 'Perfect balance of price and performance',
				text: 'Does everything I need, camera is great in daylight and low light, and the battery outlasts my old phone by hours.'
			},
			{
				name: 'Anita J.',
				rating: 4,
				helpful: 3,
				date: 'Oct 14, 2026',
				title: 'Solid and reliable',
				text: 'No surprises — in a good way. Fast, great screen, good photos. The Lightning port feels dated next to USB-C phones, though.'
			}
		],
		qa: [
			{
				q: 'Does the iPhone 14 use USB-C?',
				a: 'No, the iPhone 14 uses a Lightning port. USB-C arrived with the iPhone 15 series.'
			},
			{
				q: 'Will it get future iOS updates?',
				a: 'Yes, the iPhone 14 will receive iOS updates for several more years from launch.'
			}
		]
	},
	{
		id: 5,
		name: 'Apple Watch Ultra 2',
		price: 84900,
		oldPrice: 89900,
		rating: 4.7,
		reviews: 132,
		category: 'Smartwatches',
		stock: 9,
		tag: 'New',
		desc: 'The toughest Apple Watch ever. 49mm titanium case, the brightest display on any Apple Watch, dual-frequency GPS and up to 36 hours of battery for adventures on land and sea.',
		src: '/product-watch.webp',
		images: ['/product-watch.webp'],
		highlights: [
			'49mm aerospace titanium case, sapphire crystal',
			'3000-nit Always-On Retina display',
			'Dual-frequency GPS — accurate even in cities and canyons',
			'Up to 36 hours battery (72 hours in Low Power Mode), 100m water resistance'
		],
		specs: [
			{ label: 'Case', value: '49 mm aerospace titanium' },
			{ label: 'Display', value: 'Always-On Retina, up to 3000 nits' },
			{ label: 'Chip', value: 'S9 SiP with double-tap gesture' },
			{ label: 'Battery', value: 'Up to 36 hours (72 hours Low Power Mode)' },
			{ label: 'Water resistance', value: '100 m, EN13319 dive certified to 40 m' },
			{ label: 'Sensors', value: 'Heart rate, ECG, blood oxygen, temperature, compass' }
		],
		option: { label: 'Strap colour', choices: ['Orange', 'Black', 'White'], priceDeltas: [0, 0, 0] },
		seedReviews: [
			{
				name: 'Imran S.',
				rating: 5,
				helpful: 12,
				date: 'Nov 6, 2026',
				title: 'Built like a tank, looks great too',
				text: 'Took it hiking, swimming and to the gym — the screen is readable in direct sun and the battery lasts two full days for me.'
			},
			{
				name: 'Tara W.',
				rating: 4,
				helpful: 5,
				date: 'Oct 21, 2026',
				title: 'Brilliant for outdoors, big on small wrists',
				text: 'GPS accuracy is excellent and the display is the best I have seen on a watch. It is a large watch though — try the strap sizes before you commit.'
			}
		],
		qa: [
			{
				q: 'What strap sizes are available?',
				a: 'The strap comes in S, M and L. Measure your wrist (see the size guide on this page) — most people fit M, and the strap is easy to swap.'
			},
			{
				q: 'Can I swim and dive with it?',
				a: 'Yes, it is water resistant to 100 m and certified for recreational scuba diving down to 40 m.'
			}
		]
	},
	{
		id: 6,
		name: 'AirPods Max',
		price: 54900,
		oldPrice: 59900,
		rating: 4.6,
		reviews: 97,
		category: 'Audio',
		stock: 14,
		desc: 'High-fidelity audio, computational audio and active noise cancellation in a beautifully built over-ear design. Personalised Spatial Audio puts you in the centre of the sound.',
		src: '/product-headphones.webp',
		images: ['/product-headphones.webp'],
		highlights: [
			'Active Noise Cancellation with Transparency mode',
			'Personalised Spatial Audio with dynamic head tracking',
			'20 hours of listening time with ANC on',
			'Knit-mesh canopy and memory-foam ear cushions'
		],
		specs: [
			{ label: 'Driver', value: 'Apple-designed 40 mm dynamic driver' },
			{ label: 'Chip', value: 'H1 chip in each ear cup' },
			{ label: 'Battery', value: 'Up to 20 hours (ANC + Spatial Audio on)' },
			{ label: 'Charging', value: 'USB-C, 5 minutes = 1.5 hours playback' },
			{ label: 'Weight', value: '384.8 g' },
			{ label: 'In the box', value: 'AirPods Max, Smart Case, USB-C cable' }
		],
		option: { label: 'Colour', choices: ['Sage', 'Black', 'Silver'], priceDeltas: [0, 0, 0] },
		seedReviews: [
			{
				name: 'Meera K.',
				rating: 5,
				helpful: 10,
				date: 'Nov 7, 2026',
				title: 'The sound is just superb',
				text: 'Warm, detailed and the ANC silences my noisy commute completely. The build quality feels like a luxury product, because it is.'
			},
			{
				name: 'Dev P.',
				rating: 4,
				helpful: 6,
				date: 'Oct 26, 2026',
				title: 'Amazing sound, heavy for long sessions',
				text: 'Best-sounding headphones I own, and Spatial Audio on movies is a treat. They are on the heavy side, so take a break every couple of hours.'
			}
		],
		qa: [
			{
				q: 'Do AirPods Max work with Android?',
				a: 'Yes, they pair over Bluetooth and work for music and calls. Spatial Audio and automatic device switching need Apple devices.'
			},
			{
				q: 'How long does the battery last?',
				a: 'About 20 hours of listening with ANC and Spatial Audio on. A 5-minute USB-C charge gives around 1.5 hours of playback.'
			}
		]
	},
	{
		id: 7,
		name: 'PlayStation 5',
		price: 59990,
		oldPrice: 69990,
		rating: 4.8,
		reviews: 321,
		category: 'Gaming',
		stock: 7,
		tag: 'Best Seller',
		desc: 'Lightning-fast loading, 4K gaming up to 120Hz and the immersive DualSense controller. The PS5 puts you at the centre of the game with haptic feedback and adaptive triggers.',
		src: '/product-ps5.webp',
		images: ['/product-ps5.webp'],
		highlights: [
			'Ultra-high-speed custom SSD — near-instant loading',
			'Up to 4K 120Hz with ray tracing',
			'DualSense controller with haptics and adaptive triggers',
			'Tempest 3D AudioTech for immersive sound'
		],
		specs: [
			{ label: 'CPU', value: 'AMD Zen 2, 8 cores at 3.5 GHz' },
			{ label: 'GPU', value: 'AMD RDNA 2, 10.28 TFLOPS' },
			{ label: 'Storage', value: '1TB custom NVMe SSD (expandable)' },
			{ label: 'Output', value: 'Up to 4K 120 Hz, 8K ready, HDR' },
			{ label: 'Controller', value: 'DualSense wireless, USB-C charging' },
			{ label: 'In the box', value: 'PS5 console, DualSense controller, stand, cables' }
		],
		option: { label: 'Storage', choices: ['1TB', '2TB'], priceDeltas: [0, 10000] },
		seedReviews: [
			{
				name: 'Arjun B.',
				rating: 5,
				helpful: 21,
				date: 'Nov 10, 2026',
				title: 'The DualSense is a revelation',
				text: 'Feeling the rain and the bowstring through the controller genuinely changes games. Loading times are seconds, not minutes.'
			},
			{
				name: 'Nina F.',
				rating: 5,
				helpful: 8,
				date: 'Oct 30, 2026',
				title: 'Worth every rupee — I mean dollar',
				text: 'Set it up in ten minutes, games look stunning in 4K, and it is surprisingly quiet even during long sessions.'
			}
		],
		qa: [
			{
				q: 'Can I expand the storage?',
				a: 'Yes, there is an M.2 SSD slot for compatible NVMe drives. You can also store PS4 games on an external USB drive.'
			},
			{
				q: 'Does it play PS4 games?',
				a: 'Yes, the vast majority of PS4 games are backward compatible and many run better on PS5.'
			}
		]
	},
	{
		id: 8,
		name: 'Samsung Galaxy S24 Ultra',
		price: 119999,
		oldPrice: 134999,
		rating: 4.8,
		reviews: 243,
		category: 'Smartphones',
		stock: 10,
		desc: 'Galaxy AI, a 200MP camera and the built-in S Pen. Titanium frame, flat 6.8" display and a battery that easily lasts two days of normal use.',
		src: '/phone-galaxy-s24.webp',
		images: ['/phone-galaxy-s24.webp'],
		highlights: [
			'Galaxy AI: Live Translate, Circle to Search, Note Assist',
			'200MP camera with 100x Space Zoom',
			'Built-in S Pen for notes, sketches and remote control',
			'Titanium frame, 5000 mAh battery'
		],
		specs: [
			{ label: 'Display', value: '6.8" Dynamic AMOLED 2X, 120 Hz, 2600 nits' },
			{ label: 'Chip', value: 'Snapdragon 8 Gen 3 for Galaxy' },
			{ label: 'Camera', value: '200MP main + 50MP tele + 12MP ultrawide + 10MP tele' },
			{ label: 'Battery', value: '5000 mAh, 45W wired / 15W wireless charging' },
			{ label: 'S Pen', value: 'Built-in, 2.8 ms latency' },
			{ label: 'In the box', value: 'Galaxy S24 Ultra, S Pen, USB-C cable' }
		],
		option: { label: 'Storage', choices: ['256GB', '512GB', '1TB'], priceDeltas: [0, 15000, 30000] },
		seedReviews: [
			{
				name: 'Vikram R.',
				rating: 5,
				helpful: 18,
				date: 'Nov 9, 2026',
				title: 'The S Pen alone is worth it',
				text: 'I take all my meeting notes on this phone. The 200MP camera is ridiculous in daylight, and the battery goes two days without trying.'
			},
			{
				name: 'Sara L.',
				rating: 5,
				helpful: 7,
				date: 'Oct 28, 2026',
				title: 'Big, fast, and the AI is actually useful',
				text: 'Live Translate on calls works shockingly well. The flat screen is a big improvement — no more accidental edge touches.'
			}
		],
		qa: [
			{
				q: 'Does the S Pen come in the box?',
				a: 'Yes, the S Pen is built into the phone and included — no separate purchase needed.'
			},
			{
				q: 'Is there a microSD slot?',
				a: 'No, storage is not expandable. Choose the 512GB or 1TB model if you shoot a lot of video.'
			}
		]
	}
];

export function getProduct(id: number): Product | undefined {
	return products.find((p) => p.id === id);
}

export function relatedProducts(id: number, count = 4): Product[] {
	const current = getProduct(id);
	const others = products.filter((p) => p.id !== id);
	const sameCat = others.filter((p) => current && p.category === current.category);
	return [...sameCat, ...others.filter((p) => !sameCat.includes(p))].slice(0, count);
}

export type Category = {
	name: string;
	photo: string;
};

export const categories: Category[] = [
	{ name: 'Smartphones', photo: '/phone-iphone15pro.webp' },
	{ name: 'Smartwatches', photo: '/product-watch.webp' },
	{ name: 'Audio', photo: '/product-headphones.webp' },
	{ name: 'Gaming', photo: '/product-ps5.webp' }
];

/** Landing-page sections (same products as the reference design). */
export const readyToWear: Product[] = [
	getProduct(5)!,
	getProduct(6)!,
	getProduct(7)!,
	getProduct(3)!
];

export const smartphones: Product[] = [
	getProduct(1)!,
	getProduct(2)!,
	getProduct(8)!,
	getProduct(4)!
];

export function formatPrice(n: number): string {
	return '₹' + n.toLocaleString('en-IN');
}
