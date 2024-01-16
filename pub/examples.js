/* My JS Library usage examples */
"use strict";
const log = console.log
log('----------')
log('SCRIPT: Examples of using my js library - fashion library')
log('----------')

/* Initialzie some information */
// Create several Picture instances (picSrc, color) 
// & ExpandedLabel instance (labelName, url, header, price, currency, pictures, captionColor)


/* E.g. Top 1 */
const top1Pictures = [new Picture('./pics/top-white.jpg', "white"), 
                  new Picture('./pics/top-green.jpg', "green"), 
                  new Picture('./pics/top-purple.jpg', "purple")]

const top1Expanded = new ExpandedLabel("Top 1", "https://www.urbanoutfitters.com/en-ca/shop/koto-01004-shrunken-tee2?color=050&recommendation=pdp-rightRail-sfrectray-pdptopsimilarity&type=REGULAR&quantity=1", 
                                        "KOTO 01.004 Shrunken Tee", 
                                        24, "CA$", top1Pictures, "black")

/* E.g. Accessory 1*/
const accessory1Pictures = [new Picture('./pics/belt-lavender2.jpg', "lavender"),
                            new Picture('./pics/belt-lavender.jpg', "lavender"),
                            new Picture('./pics/belt-tan.jpg', "tan"),
                            new Picture('./pics/belt-slate.jpg', "slate")]
const accessory1Expanded = new ExpandedLabel("Accessory 1", "https://www.urbanoutfitters.com/en-ca/shop/webbed-grommet-belt?category=SEARCHRESULTS&color=053&searchparams=q%3Dbelt&type=REGULAR&size=ONE%20SIZE&quantity=1",
                                            "Webbed Grommet Belt", 
                                            24, "CA$", accessory1Pictures, "black")

/* E.g. Bottom 1 */
const bottom1Pictures = [new Picture('./pics/bottom-cream.jpg', "cream"), 
                        new Picture('./pics/bottom-lightblue.jpg', "light blue"),
                        new Picture('./pics/bottom-red.jpg', "red")]
const bottom1Expanded = new ExpandedLabel("Bottom 1", "https://www.urbanoutfitters.com/en-ca/shop/bdg-y2k-low-rise-cargo-pant?category=womens-bottoms&color=012&type=REGULAR&quantity=1", 
                                        "BDG Y2K Low-Rise Cargo Pant", 
                                        89, "CA$", bottom1Pictures, "white")


/* E.g. Shoes 1 */
const shoes1Pictures = [new Picture('./pics/shoes1.jpg', "Lavender"), 
                        new Picture('./pics/shoes2.jpg', "Lavender"),
                        new Picture('./pics/shoes3.jpg', "Lavender"),
                        new Picture('./pics/shoes4.jpg', "Lavender")]

const shoes1Expanded = new ExpandedLabel("Shoes 1", "https://www.urbanoutfitters.com/en-ca/shop/bdg-y2k-low-rise-cargo-pant?category=womens-bottoms&color=012&type=REGULAR&quantity=1", 
                            "Converse Run Star Ombré Sneaker", 
                            140, "CA$", shoes1Pictures, "white")


/* E.g. Bag 1 */
const bag1Pictures = [new Picture('./pics/bag1.jpg', "Black"), 
                        new Picture('./pics/bag2.jpg', "Black"),
                        new Picture('./pics/bag3.jpg', "Black"),]

const bag1Expanded = new ExpandedLabel("Bag 1", "https://www.urbanoutfitters.com/en-ca/shop/nunoo-helena-new-zealand-crossbody-bag2?color=001&recommendation=pdp-primary-sfrectray-webconsentcobrowse&type=REGULAR&size=ONE%20SIZE&quantity=1", 
                            "Núnoo Helena New Crossbody Bag", 
                            229, "CA$", bag1Pictures, "black")


/* E.g. Dress 1 */
const dress1Pictures = [new Picture('./pics/dress-yellow.jpg', "Yellow"), 
                        new Picture('./pics/dress-black.jpg', "Black"),
                        new Picture('./pics/dress-pink.jpg', "Pink"),]

const dress1Expanded = new ExpandedLabel("Dress 1", "https://www.urbanoutfitters.com/en-ca/shop/nunoo-helena-new-zealand-crossbody-bag2?color=001&recommendation=pdp-primary-sfrectray-webconsentcobrowse&type=REGULAR&size=ONE%20SIZE&quantity=1", 
                            "UO Betty Collared Mini Dress", 
                            89, "CA$", dress1Pictures, "black")

/* Maginifier  */
const magnifier = new Magnifier("myimage", 2);
magnifier.magnify()

$("#range").on("change", (e => {
    $("#rangevalue").val(e.target.value)
    magnifier.zoom = e.target.value
    magnifier.magnify()
}))


/* Product Cards with SlideShow */
// ProductCardGenerator(cardId, expandedLabel, arrows, auto_play, auto_play_speed, defaut_playing)

// Case 1: manual slideshow with pic div
const pcg = new ProductCardGenerator("sliderShow", shoes1Expanded, true, false)
pcg.renderCard()

// Case 2: auto slideshow with pic div, default playing
const pcg2 = new ProductCardGenerator("sliderShow2", bag1Expanded, true, true, 2500, true)
pcg2.renderCard()

// Case 3: auto slideshow with pic div, default playing
const pcg3 = new ProductCardGenerator("sliderShow3", bottom1Expanded, true, true, 1500, false)
pcg3.renderCard()

/* Horizontal slider bar for product cards */
const cardGenerator = new ProductCardGenerator("sliderBar1", top1Expanded, false, false)
cardGenerator.renderCard()

const cardGenerator2 = new ProductCardGenerator("sliderBar2", accessory1Expanded, false, false)
cardGenerator2.renderCard()

const cardGenerator3 = new ProductCardGenerator("sliderBar3", bottom1Expanded, false, false)
cardGenerator3.renderCard()

const cardGenerator4 = new ProductCardGenerator("sliderBar4", shoes1Expanded, false, false)
cardGenerator4.renderCard()

const cardGenerator5 = new ProductCardGenerator("sliderBar5", bag1Expanded, false, false)
cardGenerator5.renderCard()

const cardGenerator6 = new ProductCardGenerator("sliderBar6", dress1Expanded, false, false)
cardGenerator6.renderCard()

const sliderBarGenerator = new SliderBar("sliderBar")
sliderBarGenerator.renderSliderBar()



/* Add Labels & Pop-up Dialogues  */
/* Option 1: Init a outfit generator and enter labels manually */

// Create Outfit Generator
const og = new OutfitGenerator('./pics/outfit.jpg', "popup")
og.makeOutfit()

// Coordinates of each click on the picutre will be logged out in percentage form.
// Generate labels with relative position in outfit picture
const l1 = og.addLabel(25, 25.89, top1Expanded.labelName)
const l2 = og.addLabel(23.5, 39.55, accessory1Expanded.labelName)
const l3 = og.addLabel(23.5, 51, bottom1Expanded.labelName)
const l4 = og.addLabel(21, 67, shoes1Expanded.labelName)
const l5 = og.addLabel(58.67995160384289, 35.091223353178414, bag1Expanded.labelName)
const l6 = og.addLabel(86.25673009059877, 35.828692145189166, dress1Expanded.labelName)

// Link expanded labels to existing labels and render them properly
// NOTE: linkExpandedLabel will call render functions to render the dialog automatically 
og.linkExpandedLabel(top1Expanded)
og.linkExpandedLabel(accessory1Expanded)
og.linkExpandedLabel(bottom1Expanded)
og.linkExpandedLabel(shoes1Expanded)
og.linkExpandedLabel(bag1Expanded)
og.linkExpandedLabel(dress1Expanded)


// Added option to toggle the labels
// Can click to display/hide the existing labels in pictures
og.toggleLabels()




/* Click to Add Labels*/
/* Option 2: Init a generator and enter labels on clicks */

const og2 = new OutfitGenerator('./pics/outfit.jpg', "click")
og2.makeOutfitAndAddLabels()




