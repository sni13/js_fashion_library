/* My JS Library - Fashionly Library */
"use strict";
 

(function(global, document, $) { 

    /* Helper function for PicSlideShow*/
    function getCursorRelativePosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const length = rect.right - rect.left
        const width =  rect.bottom - rect.top
        const x = 100 * (event.clientX - rect.left) / length
        const y = 100 * (event.clientY - rect.top) / width
        global.console.log("x%: " + x + " y%: " + y);
        return [x, y]
    }

    function PicSlideShow(classname, speed){
        var myIndex = 0
        carousel()

        function carousel() {
            var i;
            var x = document.getElementsByClassName(classname);
            for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
            }
            myIndex++;
            if (myIndex > x.length) {myIndex = 1}    
            x[myIndex-1].style.display = "block";  
            setTimeout(carousel, speed);
        }
    }

    /* Helper functions for slideShow */
    function SlideShow(dialog){
        this.slideIndex = 1;
        this.dialog = dialog;
    }

    SlideShow.prototype = {
        plusSlides: function (n) {
            var bind = this
            bind.showSlides(this.slideIndex += n);
        }
        ,
        currentSlide: function (n) {
            var bind = this
            bind.showSlides(this.slideIndex = n);
        }
        ,
        showSlides: function (n) {
            var i;
            var slides = this.dialog.getElementsByClassName("sliderPicDiv");
            var dots = this.dialog.getElementsByClassName("dot");
            if (n > slides.length) {this.slideIndex = 1}
            if (n < 1) {this.slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex-1].style.display = "block";
            dots[this.slideIndex-1].className += " active";
        }
    }

    function Location (x, y){
        this.x = x
        this.y = y
    }

    function Label(location, labelName){
        this.location = location;
        this.labelName = labelName;
        this.expandedLabel = null;
        this.dialog = null;
    }

    Label.prototype = {
        linkExpandedLabel: function(expandedLabel){
            this.expandedLabel = expandedLabel
        }
    }

    function Picture(picSrc, caption){
        this.picSrc = picSrc;
        this.caption = caption;
    }


    function ExpandedLabel(labelName, url, header, price, currency, pictures, captionColor="white"){
        this.labelName = labelName;
        this.url = url;
        this.header = header;
        this.price = price;
        this.currency = currency;
        this.pictures = pictures;
        this.captionColor = captionColor;
    }



    function OutfitGenerator(imgSrc, divId) {
        this.imgSrc = imgSrc
        this.labels = []
        this.divId = divId
    }

    OutfitGenerator.prototype = {

        makeOutfit: function () {
            const outfitDiv = document.createElement('div')
            outfitDiv.id = "outfitDiv"
            const img = document.createElement("img")
            img.id = "outfitPic"
            img.src = this.imgSrc
            img.addEventListener('mousedown', function(e) {
                getCursorRelativePosition(img, e)
            })
            outfitDiv.append(img)
            const body = $('#'+this.divId)
            body.append(outfitDiv)
        }
        ,
        
        addLabel: function (x, y, labelName, outfitDivName='outfitDiv'){ 
            // labels have to be unique
            // var bind = this;
            if (this.ifLabelExists(labelName)){
                global.console.log("ERROR: Entered duplicate label, please check and try again")
                global.console.log("The label name '", labelName, "' exists")
            }else{
                const labelDiv = document.createElement("div")
                const labelText = document.createTextNode(labelName)
                labelDiv.appendChild(labelText)
                labelDiv.className = "labelDiv"
                labelDiv.id = labelName.split(' ').join('_')
                // $('#outfitDiv').append(labelDiv)
                $("#"+outfitDivName).append(labelDiv)
                labelDiv.style.setProperty('--mouse-x', x + "%")
                labelDiv.style.setProperty('--mouse-y', y + "%")
                const newLabel = new Label(new Location(x,y), labelName)
                this.labels.push(newLabel)
                return newLabel
            }
        }
        ,
        toggleLabels: function (){
            const labelDivs = document.getElementsByClassName("labelDiv")
            // global.console.log(labelDivs)
            // global.console.log(labelDivs.length)
            
            const outfitDiv = document.getElementById("outfitDiv")
            if (outfitDiv){
                outfitDiv.addEventListener('click', (e) => {
                    if (e.target.id == "outfitPic"){
                        // global.console.log("toggleLabels")
                        for (let i = 0; i < labelDivs.length; i++){
                            if (labelDivs[i].style.display == "none"){
                                labelDivs[i].style.display = "block"
                            }else{
                                labelDivs[i].style.display = "none"
                            }
                        }
                    }
                })
            }
            
        }
        ,
        renderExpandedLabel: function (label){
            var bind = this;
            const labelDiv = $('.labelDiv'+ '#'+label.labelName.split(' ').join('_'))
            labelDiv.on("mouseover", (e) => {
                global.console.log("Hovering over", label.labelName)
                bind.renderExpandedLabelDialog(label)
                label.dialog.style.display = ""
            })
        }
        ,
        renderExpandedLabelDialog: function (label) {
            var bind = this;
            const dialog = document.createElement("tooltip")
            dialog.className = "dialog"

            dialog.style.setProperty('--mouse-x', label.location.x + "%")
            dialog.style.setProperty('--mouse-y', label.location.y + "%")
            $('#outfitDiv').append(dialog)
            dialog.style.display = "none"
            // dialog.style.display = ""
            dialog.append(bind.renderExpandedLabelHeader(label))
            dialog.append(bind.renderExpandedLabelPrice(label))
            bind.renderExpandedLabelPicSlider(dialog, label, false)
            label.dialog = dialog
            label.dialog.addEventListener("mouseleave", (e) => {
                label.dialog.style.display = "none"
            })
        },
        renderExpandedLabelHeader: function (label){
            const headerDiv = document.createElement("div")
            const header = document.createElement('a');
            headerDiv.append(header)
            headerDiv.className = "headerDiv"
            header.setAttribute('href',label.expandedLabel.url);
            header.innerHTML = label.expandedLabel.header;
            return headerDiv
        }
        ,
        renderExpandedLabelPrice: function (label){
            const priceDiv = document.createElement("div")
            const price = document.createElement("h3")
            priceDiv.append(price)
            priceDiv.className = "priceDiv"
            price.innerText = label.expandedLabel.currency + ' ' +  label.expandedLabel.price
            return priceDiv
        }
        ,
        renderExpandedLabelPicSlider: function (dialog, label, auto_play=false){
            const ss = new SlideShow(dialog)
            const sliderDiv = document.createElement("div")
            sliderDiv.className = "slideshowDiv"
            dialog.append(sliderDiv)
            // Images with number and caption
            label.expandedLabel.pictures.map((picture, index) => {
                const picDiv = document.createElement("div")
                picDiv.className = "sliderPicDiv"
                // const numberDiv = document.createElement("div")
                // numberDiv.className = "slideNumDiv"
                // numberDiv.innerText = index + 1 + '/' + label.expandedLabel.pictures.length
                const img = document.createElement("img")
                img.src = picture.picSrc
                img.className = "sliderPic"
                const captionDiv = document.createElement("div")
                captionDiv.style.color = label.expandedLabel.captionColor
                captionDiv.className = "slideCaptionDiv"
                const caption = document.createElement("h3")
                caption.className = "caption"
                caption.innerText = picture.caption
                captionDiv.append(caption)
                // picDiv.append(numberDiv)
                picDiv.append(img)
                picDiv.append(captionDiv)
                sliderDiv.append(picDiv)
                // sliderDiv.append(document.createElement("br"))
            })
            // magnify("img",3)
            // if (auto_play){
            //     ss.slideIndex = 0;
            //     ss.showSlidesAutoplay()
            // }else{
                    // Prev, next buttons
            const buttonsDiv = document.createElement('div');
            const prev = document.createElement('a');
            prev.className = "prev"
            prev.append(document.createTextNode("<"))
            prev.addEventListener("click", (e) => {
                ss.plusSlides(-1);
            })
            const next = document.createElement('a');
            next.className = "next"
            next.append(document.createTextNode(">"))
            next.addEventListener("click", (e) => {
                ss.plusSlides(1);
            })
            buttonsDiv.append(prev)
            buttonsDiv.append(next)
            sliderDiv.append(buttonsDiv)
            // Dots
            const dotsDiv = document.createElement('div')
            dotsDiv.className = "dotsDiv"
            dialog.append(dotsDiv)
            label.expandedLabel.pictures.map((picture, index) => {
                const dot = document.createElement('span')
                dot.addEventListener("click", (e) => {
                    ss.currentSlide(index + 1)
                })
                dot.className = "dot"
                dotsDiv.append(dot)
            })
            ss.showSlides(ss.slideIndex)
                // }
        }
        ,
        linkExpandedLabel: function (expandedLabel){
            var bind = this
            const label = this.getLabelByName(expandedLabel.labelName)
            if (label){
                label.linkExpandedLabel(expandedLabel)
                // bind.renderExpandedLabelDialog(label)
                bind.renderExpandedLabel(label)
            }else{
                global.console.log("Cannot link this expanded label to any existing labels")
            }
        }
        ,
        getLabelByName: function(labelName){
            return this.labels.filter((label) => {
                return label.labelName == labelName
            })[0]
        }
        ,
        ifLabelExists: function(newLabelName){
            const res = this.labels.filter((label) => {
                return label.labelName == newLabelName
            })
            return res.length > 0 
        }
        ,
        getAllLabels: function(){
            global.console.log("Below are existing labels: ")
            this.labels.map((label) => {
                global.console.log(label.labelName)
            })
        } 
        ,
        makeOutfitAndAddLabels: function (){
            var bind = this;
            const body = $('#'+this.divId)
            const outfitDiv = document.createElement('div')
            outfitDiv.id = "outfitDiv2"
            const img = document.createElement("img")
            img.src = this.imgSrc
            img.id = "outfitPic"
            img.addEventListener('mousedown', function(e) {
                const res = getCursorRelativePosition(img, e)
                bind.addLabelOnClick(res[0], res[1])
            })
            outfitDiv.append(img)
            body.append(outfitDiv)
        }
        ,
        
        addLabelOnClick:  function (x, y) {
            const bind = this
            $('div').remove(".inputDiv")
            const inputlDiv = document.createElement("div")
            inputlDiv.className = "inputDiv"
            const labelText = document.createElement("input")
            labelText.className = "input"
            labelText.placeholder = "Type label here..."
            labelText.type = "text"
            inputlDiv.appendChild(labelText)
            const saveButton = document.createElement("button")
            saveButton.innerText = "save"
            inputlDiv.appendChild(saveButton)
            saveButton.addEventListener("click", (e) => {
                global.console.log("Entered Label: '" + labelText.value + "'")
                global.console.log("Please save to database in backend in use.")
                global.console.log(x, y, labelText.value)
                inputlDiv.style.display = "none"
                bind.addLabel(x, y, labelText.value, "outfitDiv2")
            })
            $('#outfitDiv2').append(inputlDiv)
            inputlDiv.style.setProperty('--mouse-x', x + "%")
            inputlDiv.style.setProperty('--mouse-y', y + "%")
            
        }
    }

    function ProductCardGenerator(cardId, expandedLabel, arrows, auto_play, auto_play_speed=2000, defaut_playing=false){
        this.card = document.getElementById(cardId)
        this.expandedLabel = expandedLabel
        this.arrows = arrows
        this.auto_play = auto_play
        this.auto_play_speed = auto_play_speed
        this.defaut_playing = defaut_playing
        this.pause = defaut_playing ? false: true;
    }

    ProductCardGenerator.prototype = {

        renderCard: function (){
            var bind = this
            bind.renderCardPicSlider()
            bind.renderCardHeader()
            bind.renderCardPrice()
        },

        renderCardHeader: function (){
            const headerDiv = document.createElement("div")
            const header = document.createElement('a');
            headerDiv.append(header)
            headerDiv.className = "headerDiv"
            header.setAttribute('href', this.expandedLabel.url);
            header.innerHTML = this.expandedLabel.header;
            this.card.append(headerDiv)
        }
        ,
        renderCardPrice: function (){
            const priceDiv = document.createElement("div")
            const price = document.createElement("h3")
            priceDiv.append(price)
            priceDiv.className = "priceDiv"
            price.innerText = this.expandedLabel.currency + ' ' +  this.expandedLabel.price
            this.card.append(priceDiv)
        }
        ,
        renderCardPicSlider: function (){
            const ss = new SlideShow(this.card)
            const sliderDiv = document.createElement("div")
            sliderDiv.className = "slideshowDiv"
            this.card.append(sliderDiv)
            // Images with number and caption
            this.expandedLabel.pictures.map((picture, index) => {
                const picDiv = document.createElement("div")
                picDiv.className = "sliderPicDiv"
                const img = document.createElement("img")
                img.src = picture.picSrc
                img.className = "sliderPic"
                img.id = "img"
                const captionDiv = document.createElement("div")
                captionDiv.style.color = this.expandedLabel.captionColor
                captionDiv.className = "slideCaptionDiv"
                const caption = document.createElement("h3")
                caption.className = "caption"
                caption.innerText = picture.caption
                captionDiv.append(caption)
                this.card.addEventListener("mouseover", () => {
                    captionDiv.style.display="none"
                    this.pause = this.defaut_playing ? true : false;
                })
                this.card.addEventListener("mouseleave", () => {
                    captionDiv.style.display="block"
                    this.pause = this.defaut_playing ? false : true;
                })
                // picDiv.append(numberDiv)
                picDiv.append(img)
                picDiv.append(captionDiv)
                sliderDiv.append(picDiv)
            })
            
            // Prev, next buttons
            if (this.arrows){
                const buttonsDiv = document.createElement('div');
                const prev = document.createElement('a');
                prev.className = "prev"
                prev.append(document.createTextNode("<"))
                prev.addEventListener("click", (e) => {
                    ss.plusSlides(-1);
                })
                const next = document.createElement('a');
                next.className = "next"
                next.append(document.createTextNode(">"))
                next.addEventListener("click", (e) => {
                    ss.plusSlides(1);
                })
                buttonsDiv.append(prev)
                buttonsDiv.append(next)
                sliderDiv.append(buttonsDiv)
            }

            // Dots
            const dotsDiv = document.createElement('div')
            dotsDiv.className = "dotsDiv"
            this.card.append(dotsDiv)
            this.expandedLabel.pictures.map((picture, index) => {
                const dot = document.createElement('span')
                dot.addEventListener("click", (e) => {
                    ss.currentSlide(index + 1)
                })
                dot.className = "dot"
                dotsDiv.append(dot)
            })

            if (this.auto_play){
                ss.slideIndex = 1
                ss.showSlides(ss.slideIndex)
                setInterval(() => {
                    if (!this.pause){
                        ss.plusSlides(1)
                    }
                }, this.auto_play_speed)
            }else{
                ss.showSlides(ss.slideIndex)
            }
        }
    }

    function Magnifier(imgID, zoom){
        this.imgID = imgID
        this.zoom = zoom
    }

    Magnifier.prototype = {
        magnify() {
            var img, glass, width, height;
            img = document.getElementById(this.imgID);
            const bind = this

            /* Remove exisiting magnifier when re-render */
            if (img.parentElement.getElementsByClassName("magnifier").length > 0){
                const oldMagnifier = img.parentElement.getElementsByClassName("magnifier")[0]
                img.parentElement.removeChild(oldMagnifier)
                // img.parentElement.getElementsByClassName("magnifier")[0].style.display = "none"
            }
        
            /* Create & insert magnifier glass: */
            glass = document.createElement("DIV");
            glass.setAttribute("class", "magnifier");
            img.parentElement.insertBefore(glass, img);
        
            /* Insert magnifier glass: */
            
        
            /* Set background properties for the magnifier glass: */
            glass.style.backgroundImage = "url('" + img.src + "')";
            glass.style.backgroundRepeat = "no-repeat";
            glass.style.backgroundSize = (img.width * this.zoom) + "px " + (img.height * this.zoom) + "px";
            width = glass.offsetWidth / 2;
            height = glass.offsetHeight / 2;
        
            /* Execute a function when someone moves the magnifier glass over the image: */
            glass.addEventListener("mousemove", (e) => {bind.moveMagnifier(e, img, glass, width, height)});
            img.addEventListener("mousemove", (e) => {bind.moveMagnifier(e, img, glass, width, height)});
        
            img.addEventListener("mouseleave", (e) => {
                e.preventDefault();
                glass.style.display = "none"
            });
        }
        ,
        moveMagnifier(e, img, glass, width, height) {
        
            var pos, x, y;
            var bw = 3
            const bind = this
            
            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            /* Get the cursor's x and y positions: */
            pos = bind.getCursorPos(e, img);
            x = pos.x;
            y = pos.y;
            /* Prevent the magnifier glass from being positioned outside the image: */
            if (x > img.width - (width / this.zoom)) {x = img.width - (width / this.zoom);}
            if (x < width / this.zoom) {x = width / this.zoom;}
            if (y > img.height - (height / this.zoom)) {y = img.height - (height / this.zoom);}
            if (y < height / this.zoom) {y = height / this.zoom;}
            /* Set the position of the magnifier glass: */
            glass.style.left = (x - width) + "px";
            glass.style.top = (y - height) + "px";
            /* Display what the magnifier glass "sees": */
            glass.style.backgroundPosition = "-" + ((x * this.zoom) - width + bw) + "px -" + ((y * this.zoom) - height + bw) + "px";
            glass.style.display = ""
        }
        ,
        getCursorPos(e, img) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /* Get the x and y positions of the image: */
            a = img.getBoundingClientRect();
            /* Calculate the cursor's x and y coordinates, relative to the image: */
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return {x : x, y : y};
        }

    }


    function SliderBar(sliderBarId){
        this.sliderBarId = sliderBarId
    }

    SliderBar.prototype = {

        renderSliderBar: function(){
            const bind = this
            const sliderBarDiv = $("#" + this.sliderBarId)
            const items = sliderBarDiv.children()

            sliderBarDiv.prepend('<div id="right-button" type="button"><a id="arrow" href="#"><</a></div>');
            sliderBarDiv.append(' <div id="left-button" type="button"><a id="arrow" href="#">></a></div>');

            // Inserting Inner & Outer Divs
            items.wrapAll('<div id="inner" />');
            sliderBarDiv.find('#inner').wrap('<div id="outer"/>');

            // call renderChanges
            const outer = $('#outer')
            bind.renderChanges(outer, items)

            //add event listner to buttons
            $('#right-button').click(function(e) {
                e.preventDefault()
                var leftPos = outer.scrollLeft();
                outer.animate({
                scrollLeft: leftPos - 500
                }, 800, function() {
                if ($('#outer').scrollLeft() <= 0) {
                    bind.setInvisible($('#right-button'));
                }
                });
            });
        
            $('#left-button').click(function(e) {
                e.preventDefault()
                bind.setVisible($('#right-button'));
                var leftPos = outer.scrollLeft();
                outer.animate({
                scrollLeft: leftPos + 500
                }, 800);
            });
        
            $(window).resize(function() {
                bind.renderChanges();
            });

        }
        ,
        setInvisible: function(elem) {
            elem.css('visibility', 'hidden');
        }
        ,
        setVisible: function(elem) {
            elem.css('visibility', 'visible');
        }
        ,
        renderChanges: function(outerDiv) {
            const bind = this
            if (outerDiv){
                var maxWidth = outerDiv.outerWidth(true);
                var actualWidth = 0;
                $.each($('#inner >'), function(i, item) {
                    actualWidth += $(item).outerWidth(true);
                });
        
                if (actualWidth <= maxWidth) {
                bind.setVisible($('#left-button'));
            }
            }
            
        }
    }

    // After setup:
	// Add the CircleGenerator to the window object if it doesn't already exist.
    global.PicSlideShow = global.PicSlideShow || PicSlideShow
    global.SlideShow = global.SlideShow || SlideShow
    global.Location = global.Location || Location
    global.Label = global.Label || Label
    global.Picture = global.Picture || Picture
    global.ExpandedLabel = global.ExpandedLabel || ExpandedLabel
    global.OutfitGenerator = global.OutfitGenerator || OutfitGenerator
    global.ProductCardGenerator = global.ProductCardGenerator || ProductCardGenerator
    global.Magnifier = global.Magnifier || Magnifier
    global.SliderBar = global.SliderBar || SliderBar


})(window, window.document, $); 
