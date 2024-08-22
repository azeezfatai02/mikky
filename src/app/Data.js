export const PRODUCTS = [
  {
    id: 1,
    image: "/Batteryimg.png",
    title: "BATTERY",
    price: "75000",
    alt: "a product image",
    description:
      "A car battery is a crucial component of a vehicle's electrical system, responsible for supplying the necessary power to start the engine and run various electrical accessories when the engine is off. Typically located under the hood of the vehicle, the car battery is a rechargeable energy storage device.",
  },
  {
    id: 2,
    image: "/tyreeee.png",
    title: "TYRES",
    price: "200000",
    alt: "a product image",
    description:
      "A car tire is a critical component of a vehicle, providing the necessary traction, handling, and stability while driving. It forms the interface between the vehicle and the road, ensuring safe and efficient travel. Car tires are designed to withstand various driving conditions, offering performance, comfort, and safety.",
  },
  {
    id: 3,
    image: "/Cartools.png",
    title: "TOOLS",
    price: "50000",
    alt: "a product image",
    description:
      "Car tools are essential instruments and equipment used for the maintenance, repair, and servicing of vehicles. These tools are designed to assist both professional mechanics and car enthusiasts in performing a wide range of tasks, from simple adjustments to complex repairs. Proper use of car tools ensures safety, efficiency, and the longevity of the vehicle.",
  },
  {
    id: 4,
    image: "/seat-cover.png",
    title: "SEAT COVER",
    price: "110000",
    alt: "a product image",
    description:
      "A car seat cover is an accessory designed to protect, enhance, and personalize the seats of a vehicle. Made from a variety of materials, car seat covers offer both functional and aesthetic benefits, ensuring the longevity and comfort of the car’s interior.",
  },
  {
    id: 5,
    image: "/CarOils.png",
    title: "OILS",
    price: "32000",
    alt: "a product image",
    description:
      "Car oil, also known as engine oil or motor oil, is a critical fluid used in internal combustion engines to lubricate moving parts, reduce friction, and dissipate heat. It plays a vital role in ensuring the engine runs smoothly, efficiently, and reliably. Car oil also helps in cleaning, protecting, and cooling the engine, thereby extending its lifespan.",
  },
  {
    id: 6,
    image: "/footmat.png",
    title: "FOOT-MAT",
    price: "18000",
    alt: "a product image",
    description:
      "A car footmat, also known as a car floor mat, is an accessory designed to protect the interior floor of a vehicle from dirt, debris, moisture, and wear. Car footmats help maintain the cleanliness and aesthetic appeal of the vehicle's interior while providing added comfort and safety for the occupants.",
  },
];

export const ALLPRODUCTS = [
  {
    id: 1,
    image: "/Batteryimg.png",
    title: "BATTERY",
    price: "75000",
    alt: "a product image",
    description:
      "A car battery is a crucial component of a vehicle's electrical system, responsible for supplying the necessary power to start the engine and run various electrical accessories when the engine is off. Typically located under the hood of the vehicle, the car battery is a rechargeable energy storage device.",
  },
  {
    id: 2,
    image: "/Cartyres.png",
    title: "tyreeee",
    price: "200000",
    alt: "a product image",
    description:
      "A car tire is a critical component of a vehicle, providing the necessary traction, handling, and stability while driving. It forms the interface between the vehicle and the road, ensuring safe and efficient travel. Car tires are designed to withstand various driving conditions, offering performance, comfort, and safety.",
  },
  {
    id: 3,
    image: "/Cartools.png",
    title: "TOOLS",
    price: "50000",
    alt: "a product image",
    description:
      "Car tools are essential instruments and equipment used for the maintenance, repair, and servicing of vehicles. These tools are designed to assist both professional mechanics and car enthusiasts in performing a wide range of tasks, from simple adjustments to complex repairs. Proper use of car tools ensures safety, efficiency, and the longevity of the vehicle.",
  },
  {
    id: 4,
    image: "/seat-cover.png",
    title: "SEAT COVER",
    price: "110000",
    alt: "a product image",
    description:
      "A car seat cover is an accessory designed to protect, enhance, and personalize the seats of a vehicle. Made from a variety of materials, car seat covers offer both functional and aesthetic benefits, ensuring the longevity and comfort of the car’s interior.",
  },
  {
    id: 5,
    image: "/CarOils.png",
    title: "OILS",
    price: "32000",
    alt: "a product image",
    description:
      "Car oil, also known as engine oil or motor oil, is a critical fluid used in internal combustion engines to lubricate moving parts, reduce friction, and dissipate heat. It plays a vital role in ensuring the engine runs smoothly, efficiently, and reliably. Car oil also helps in cleaning, protecting, and cooling the engine, thereby extending its lifespan.",
  },
  {
    id: 6,
    image: "/footmat.png",
    title: "FOOT-MAT",
    price: "18000",
    alt: "a product image",
    description:
      "A car footmat, also known as a car floor mat, is an accessory designed to protect the interior floor of a vehicle from dirt, debris, moisture, and wear. Car footmats help maintain the cleanliness and aesthetic appeal of the vehicle's interior while providing added comfort and safety for the occupants.",
  },
  {
    id: 7,
    image: "/Car-rim.png",
    title: "RIMS",
    price: "60000",
    alt: "a product image",
    description:
      "A car rim, also known as a wheel rim, is the outer edge of a wheel that holds the tire in place. It is a critical component of a vehicle’s wheel assembly, playing a significant role in the vehicle's overall performance, safety, and aesthetics. Car rims are designed to provide structural support to the tire, ensuring a secure fit and proper balance.",
  },
  {
    id: 8,
    image: "/Brake-pad.png",
    title: "BRAKE PAD",
    price: "6000",
    alt: "a product image",
    description:
      "A car brake pad is a crucial component of a vehicle's braking system, responsible for creating the friction necessary to slow down or stop the vehicle. Brake pads are used in disc brakes and are pressed against the brake rotor (disc) when the brake pedal is applied. They play a vital role in ensuring the safety and performance of the vehicle by providing reliable stopping power.",
  },
  {
    id: 9,
    image: "/Car-ABS.png",
    title: "SHOCK ABSORBER",
    price: "55000",
    alt: "a product image",
    description:
      "A car shock absorber, commonly referred to simply as a shock, is a crucial component of a vehicle's suspension system. Its primary function is to absorb and dampen the impact and vibrations from the road surface, providing a smooth and stable ride. By controlling the movement of the suspension and the springs, shock absorbers ensure better handling, improved comfort, and enhanced safety.",
  },
  {
    id: 10,
    image: "/seat-cover2.png",
    title: "FOOT-MAT",
    price: "18000",
    alt: "a product image",
    description:
      "A car seat cover is an accessory designed to protect, enhance, and personalize the seats of a vehicle. Made from a variety of materials, car seat covers offer both functional and aesthetic benefits, ensuring the longevity and comfort of the car’s interior.",
  },
];

const getAllProduct = () => {
  return ALLPRODUCTS;
};

const getProduct = () => {
  return ALLPRODUCTS.find((ALLPRODUCTS) => ALLPRODUCTS.title === title);
};
