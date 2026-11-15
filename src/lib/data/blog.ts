export type BlogPost = {
	title: string;
	slug: string;
	date: string;
	excerpt: string;
	minutes: number;
	body: string[];
};

export const blogPosts: BlogPost[] = [
	{
		title: 'How to choose the right smartphone',
		slug: 'choose-right-smartphone',
		date: 'Nov 12, 2026',
		excerpt:
			'Chip, camera, battery, display and updates — five things that decide whether a phone still feels great in two years, and how to weigh them before you buy.',
		minutes: 5,
		body: [
			'Choosing a smartphone is mostly about matching the phone to how you actually use it. The fastest chip or the biggest camera number means little if the battery dies by dinner or the screen is hard to read outdoors. Before you compare models, it helps to know what actually matters.',
			'Start with the chip and software support. A current-generation chip keeps the phone fast for years, but long software support matters just as much: a phone that gets five to seven years of updates stays secure and gains new features long after you bought it. If you keep phones for three or more years, treat update length as a headline feature, not a footnote.',
			'Next, think about the camera the way you shoot. Megapixel counts are mostly marketing — sensor size, lens quality and image processing decide the result. If you take photos in low light, look at night-mode samples. If you shoot kids, pets or sport, check the zoom and how fast the camera focuses. And remember that the front camera matters as much as the rear one if you video-call a lot.',
			'Battery life is about your day, not the milliamp number. A bigger battery helps, but an efficient chip and a sensible display matter too. As a rule of thumb, look for a phone that reviewers say comfortably lasts a full day of real use — and check charging: a 30-minute top-up that gives you half a day is more useful than a slightly bigger battery that charges slowly.',
			'The display is the part you touch all day. A 120 Hz refresh rate makes scrolling feel smooth, and high brightness (over 1500 nits peak) keeps the screen readable in sunlight. Size is personal: a 6.1-inch phone fits one hand, a 6.7-inch phone is better for video and reading but needs two hands and bigger pockets.',
			'Finally, storage. Photos and video eat space fast — a minute of 4K video is roughly 400 MB. If you keep your photos on the phone and shoot video, 256GB is the safe minimum; 128GB works only if you regularly back up to the cloud. And check whether storage is expandable — on most flagship phones it is not, so choose at purchase time.',
			'In short: pick a phone with a current chip and long updates, a camera that suits your shooting, a battery that survives your day, a display you enjoy looking at, and enough storage for your photos. Get those right and the phone will quietly do its job for years.'
		]
	},
	{
		title: '5 things to check before buying wireless headphones',
		slug: 'wireless-headphones-buying-guide',
		date: 'Nov 5, 2026',
		excerpt:
			'Sound quality is only the start. Battery life, comfort, call quality and Bluetooth features decide whether you will still love your headphones in six months.',
		minutes: 4,
		body: [
			'Wireless headphones all promise great sound, long battery life and total comfort. In practice, the differences that matter show up after a week of daily use — on a crowded train, on a long call, or at the gym. Here are the five things worth checking before you buy.',
			'First, listen to the sound signature, not the spec sheet. Driver size and frequency numbers tell you very little about how music actually sounds. Some headphones are tuned for deep bass, others for clear vocals. If you can, try them with a song you know well. If you cannot try them, read reviews that describe the sound in plain words — warm, bright, bass-heavy — and match that to what you enjoy.',
			'Second, test the noise cancellation in a real setting. Active noise cancellation is brilliant for constant sounds like engines and air conditioning, but much less effective against sudden voices. If you mainly want quiet on flights and commutes, ANC is worth paying for. If you mostly listen at home, a good seal from the earcups alone may be enough, and you can save money.',
			'Third, check battery life honestly. Manufacturers quote the best case: moderate volume, ANC off. With ANC on and the volume up, expect noticeably less. Look for at least 30 hours with ANC on for over-ear headphones, and check quick charging — ten minutes plugged in should give you several hours of playback. A USB-C port is also worth having, so you can charge with the same cable as your phone.',
			'Fourth, think about comfort over hours, not minutes. Headphones that feel fine for five minutes in a shop can press painfully after an hour. Weight matters — anything under about 260 grams is comfortable for most people — and so do soft earcups and a headband that spreads the pressure. If you wear glasses, make sure the earcups do not press the arms into your head.',
			'Fifth, look at the Bluetooth features. Multipoint pairing lets the headphones stay connected to your phone and laptop at the same time, so a call on your phone pauses the video on your laptop automatically. And if you take a lot of calls, check the microphone: some headphones sound great for music but make your voice sound distant and thin on calls. A quick look at call-quality reviews will tell you.',
			'Get those five things right — sound you enjoy, ANC that fits your life, honest battery life, all-day comfort and the Bluetooth features you will actually use — and you will end up with headphones you reach for every day, not ones that gather dust in a drawer.'
		]
	},
	{
		title: 'Smartwatch buying guide: what actually matters',
		slug: 'smartwatch-buying-guide',
		date: 'Oct 28, 2026',
		excerpt:
			'Display, battery, sensors, water resistance and the ecosystem — the five things that separate a watch you wear every day from one that ends up in a drawer.',
		minutes: 5,
		body: [
			'A smartwatch lives on your wrist all day, so the details that matter are different from a phone. A watch that needs charging every night, pinches your wrist or cannot keep up with your runs will not last the month. Here is what to check before you buy.',
			'First, the display. You will read it in sunlight, in the rain and at a glance while running. Look for a bright always-on display — 1000 nits or more keeps it readable outdoors — and a screen big enough to read notifications without squinting. A sapphire or hardened-glass front is worth having if you bump your wrist into things.',
			'Second, battery life, measured honestly. Manufacturers quote light use. If you track workouts with GPS, take calls and keep the display always on, expect noticeably less. A watch that lasts two days on a charge is far easier to live with than one that needs a nightly charge — because the night is also when sleep tracking happens.',
			'Third, the sensors you will actually use. Heart-rate and sleep tracking are standard now. If you run, cycle or hike, dual-frequency GPS gives far more accurate routes in cities and forests. If you swim, check the water rating: 50 metres is fine for laps, but diving needs a dedicated dive rating. ECG and blood-oxygen sensors are useful, but only if you will actually look at the data.',
			'Fourth, the ecosystem. A watch works best with a phone from the same family — notifications, calls, payments and health data all flow more smoothly. Cross-platform watches exist and are getting better, but check the specific features you care about before assuming they all work on your phone.',
			'Finally, comfort and straps. A watch you wear 24 hours a day has to feel good at 3 a.m. as well as at 3 p.m. Weight matters — anything under 40 grams disappears on the wrist — and a strap that fits your wrist size matters more than the strap it ships with, because straps are usually swappable. Measure your wrist and check the size guide before ordering.',
			'Get those five things right — a bright readable display, battery that survives your routine, sensors for your sport, an ecosystem that fits your phone, and a comfortable fit — and you will have a watch that earns its place on your wrist every day.'
		]
	}
];

export function getPost(slug: string): BlogPost | undefined {
	return blogPosts.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string): BlogPost[] {
	return blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
}
