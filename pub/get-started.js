"use strict";

/* E.g. Top 1 */
const top1Pictures = [new Picture('./pics/top-white.jpg', "white"), 
                  new Picture('./pics/top-green.jpg', "green"), 
                  new Picture('./pics/top-purple.jpg', "purple")]

const top1Expanded = new ExpandedLabel("Top 1", "https://www.urbanoutfitters.com/en-ca/shop/koto-01004-shrunken-tee2?color=050&recommendation=pdp-rightRail-sfrectray-pdptopsimilarity&type=REGULAR&quantity=1", 
                                        "KOTO 01.004 Shrunken Tee", 
                                        24, "CA$", top1Pictures, "black")

const pcg = new ProductCardGenerator("mydiv", top1Expanded, true, true, 1000, false)
pcg.renderCard()