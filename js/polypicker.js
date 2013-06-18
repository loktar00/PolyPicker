(function polyPicker(startColor) {

    function Picker(el, startColor) {
        this.colorInput = el;
        el.style.display = "none";
        
        this.parentEl = document.createElement("input");
        this.parentEl.type = "button";
        
        el.parentNode.appendChild(this.parentEl);

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.canvas.height = 160;
        this.canvas.style.position = "absolute";
        this.canvas.style.display = "none";

        this.ctx = this.canvas.getContext("2d");

        this.canvas.className += "cpicker-canvas";

        document.body.appendChild(this.canvas);

        this.assignColor(startColor);

        // init colors this is just a default pallet that is for the atari 7800
        // TODO : Change this pallet to a more standard one and allow the option to use custom ones
        this.colors = ["#1a1a1a", "#1a1a1a", "#303030", "#444444", "#565656", "#686868", "#797979", "#8b8b8b", "#9b9b9b", "#acacac", "#bbbbbb", "#cbcbcb", "#dbdbdb", "#ebebeb", "#fafafa", "#fffeff", "#300800", "#4a2000", "#623600", "#7b4b00", "#905e00", "#a67200", "#bb8500", "#cd9700", "#dea800", "#eeb800", "#ffc700", "#ffd700", "#ffe700", "#fffa12", "#ffff33", "#ffff54", "#5b0000", "#780000", "#901600", "#a72b00", "#bf3f00", "#d45400", "#e66600", "#f77500", "#ff8600", "#ff9700", "#ffa705", "#ffb716", "#ffcb2d", "#ffe14d", "#fff46c", "#ffff8c", "#720000", "#920000", "#ac0000", "#c11300", "#d42400", "#e73700", "#f8480e", "#ff5a20", "#ff6b31", "#ff7b41", "#ff8c52", "#ff9c62", "#ffb183", "#ffc6a2", "#ffdbc3", "#fff0e2", "#700000", "#8d0011", "#a80024", "#bd0037", "#d0124a", "#e2245c", "#f4366e", "#ff477f", "#ff5890", "#ff68a0", "#ff78b0", "#ff89c4", "#ff9fe5", "#ffb4ff", "#ffcbff", "#ffe2ff", "#51005f", "#6e0072", "#890087", "#9f009b", "#b20cac", "#c51fbf", "#d531d1", "#e642e2", "#f852f4", "#ff62ff", "#ff73ff", "#ff84ff", "#ff99ff", "#ffb0ff", "#ffc7ff", "#ffdcff", "#2300af", "#4000c4", "#5a00d8", "#6f03ed", "#8216fe", "#9428ff", "#a739ff", "#b84aff", "#c95bff", "#d96dff", "#ef7fff", "#ff91ff", "#ffa2ff", "#ffb5ff", "#ffccff", "#ffe3ff", "#0000dc", "#0b00f3", "#2404ff", "#3818ff", "#4b2bff", "#5c3eff", "#6d4fff", "#7f61ff", "#9072ff", "#a583ff", "#b995ff", "#cfa7ff", "#e1b9ff", "#f5cbff", "#ffdcff", "#fff1ff", "#0000cb", "#000aee", "#0023ff", "#0236ff", "#1549ff", "#275bff", "#376dff", "#487eff", "#598fff", "#6da1ff", "#82b2ff", "#96c4ff", "#aad6ff", "#bee8ff", "#d2faff", "#e9ffff", "#000d93", "#0027b7", "#003fdb", "#0057fb", "#006aff", "#007dff", "#0f8dff", "#1e9eff", "#2fafff", "#40c0ff", "#52d2ff", "#66e4ff", "#7cf4ff", "#90ffff", "#a5ffff", "#c3ffff", "#002941", "#004363", "#005a86", "#0071a9", "#0086c2", "#0099d5", "#00aae6", "#0bbbf5", "#1cccff", "#2ddbff", "#3eecff", "#4efcff", "#5effff", "#72ffff", "#8fffff", "#adffff", "#003a08", "#005509", "#006d27", "#008547", "#009961", "#00ab75", "#00bd87", "#10ce98", "#21dfa9", "#31efb9", "#41ffc7", "#52ffd6", "#60ffe8", "#77fff9", "#92ffff", "#adffff", "#003f09", "#005909", "#007309", "#008c08", "#00a000", "#0cb212", "#1ec224", "#2dd333", "#3ee444", "#4ef454", "#5fff65", "#6fff75", "#7eff84", "#98ff96", "#b0ffa8", "#caffba", "#003907", "#005309", "#006c04", "#0d7f00", "#229400", "#37a700", "#4cba00", "#5dcb00", "#6edc00", "#7feb03", "#8dfb13", "#9dff23", "#adff33", "#c4ff44", "#deff54", "#f9ff67", "#002707", "#113f00", "#285400", "#416900", "#577d00", "#6d9100", "#82a400", "#95b500", "#a6c600", "#b6d600", "#c6e600", "#d6f600", "#e6ff02", "#f5ff13", "#ffff24", "#ffff42", "#2f0900", "#482000", "#603600", "#794b00", "#8f5f00", "#a57300", "#b98700", "#cb9700", "#dca800", "#ecb800", "#fdc900", "#ffd900", "#ffe800", "#fffb11", "#ffff31", "#ffff53"];

        // create the pallet
        var c = 0;
        for (var y = 0; y < 16; y++) {
            for (var x = 0; x < 16; x++) {
                if (this.colors[c]) {
                    this.ctx.fillStyle = this.colors[c];
                }

                this.ctx.fillRect(x * 10, y * 10, 10, 10);
                c++;
            }
        }

        // parent click event
        this.parentEl.addEventListener('click', this.openPallet.bind(this));

        // pallet click event
        // TODO : bind the click so a user clicking off of the pallet will also close it
        this.canvas.addEventListener('click', this.clicked.bind(this));
    }

    Picker.prototype = {
        openPallet: function () {
            var rect = this.parentEl.getBoundingClientRect();
            this.canvas.style.display = "inline-block";
            this.canvas.style.left = rect.right + 'px';
            this.canvas.style.top = rect.top + 'px';
        },
        assignColor: function (color) {
            this.parentEl.style.background = color;
            this.canvas.style.display = "none";
            this.value = color;
            this.colorInput.value = color;
        },
        clicked: function (e) {
            var x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

            x -= this.canvas.offsetLeft;
            y -= this.canvas.offsetTop;

            var imgData = this.ctx.getImageData(x, y, 1, 1).data,
                color = this.rgbToHex(imgData[0], imgData[1], imgData[2]);

            this.assignColor(color);
        },
        rgbToHex: function (r, g, b) {
            r = r.toString(16);
            g = g.toString(16);
            b = b.toString(16);

            if (r.length == 1) {
                r = "0" + r;
            }
            if (g.length == 1) {
                g = "0" + g;
            }
            if (b.length == 1) {
                b = "0" + b;
            }

            return "#" + r + g + b;
        }
    };

    // create a picker for all the elements
    var el = document.querySelectorAll("input[type=color]");
    if (el) {
        if (el.length > 0) {
            for (var e = 0; e < el.length; e++) {
                startColor = startColor || el[e].value;
                new Picker(el[e], el[e].value);
            }
        } else {
            startColor = startColor || el.value;
            new Picker(el, startColor);
        }
    }
})();