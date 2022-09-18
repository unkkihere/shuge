<template>
  <div id="map-container">
    <div id="mapChart"></div>

    <div id="text">
        <div id="text-wrap">
            <div id="bigIcon_wrap">
                <i class="iconfont icon-fanchuan bigIcon"></i>
            </div>
            <h3>感谢开放的互联网</h3>
            <p>每个人都能自由地看到我们的文明</p>
        </div>
    </div>

  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from '../../util/worldLow';

export default {
    mounted(){
        const root = am5.Root.new(document.getElementById("mapChart"));

        root.setThemes([ am5themes_Animated.new(root) ]);

        // 在 root 下添加 mapChart
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "translateY",
                projection: am5map.geoNaturalEarth1()
            })
        );


        // 在 mapChart 下添加容器，该容器用来盛装 switchButton、label 等元素
        const cont = chart.children.push(
            am5.Container.new(root, {
                layout: root.horizontalLayout,
                x: 20,
                y: 40
            })
        );

        // 向容器中添加 Map 标签
        cont.children.push(
            am5.Label.new(root, {
                centerY: am5.p50,
                text: "Map"
            })
        );

        // 向容器中添加滑动按钮
        const switchButton = cont.children.push(
            am5.Button.new(root, {
                themeTags: ["switch"],
                centerY: am5.p50,
                icon: am5.Circle.new(root, {
                    themeTags: ["icon"]
                })
            })
        );

        // ----向 mapChart 中添加 series
        let backgroundSeries = chart.series.unshift(
            am5map.MapPolygonSeries.new(root, {})
        );

        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color(0xedf7fa)
        });
        
        
        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        // 为滑动按钮绑定 active 事件
        switchButton.on("active", function() {
            if (!switchButton.get("active")) {
                chart.set("projection", am5map.geoNaturalEarth1());
                chart.set("panY", "translateY");
                chart.set("rotationY", 0);
                // backgroundSeries.mapPolygons.template.set("fillOpacity", 0.8);
            } else {
                chart.set("projection", am5map.geoOrthographic());
                chart.set("panY", "rotateY")
                backgroundSeries.mapPolygons.template.set("fillOpacity", 0.7);
            }
        });

        // 向容器中添加 Globe 标签
        cont.children.push(
            am5.Label.new(root, {
                centerY: am5.p50,
                text: "Globe"
            })
        );

        // ----向 mapChart 中添加 
        let polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow
            })
        );

        // ---- 向 mapChart 中添加
        let pointSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        let colorset = am5.ColorSet.new(root, {});

        pointSeries.bullets.push(function () {
            let container = am5.Container.new(root, {});

            // 默认 tooltip 的 background 的颜色会继承目标元素的 fill 属性值，
            // 如果目标元素没有设置 fill 属性，则 tooltip 的背景色会呈现透明效果

            // tooltip 的 stroke 属性值默认为白色，即 tooltip 的轮廓线颜色
            // tooltip 的文本 color 默认会设置成背景色的对比色
            let tooltip = am5.Tooltip.new(root, {

                // 要自定义背景色，首先需要禁止背景色从目标元素上继承，需要
                // 将 getFillFromSprite 设置为 false
                getFillFromSprite: false,

                // 自定义轮廓线颜色，这里直接选择从目标元素上继承
                getStrokeFromSprite: true,

                // 自定义文本颜色首先需要禁止默认行为，将 autoTextColor 设为 false 
                autoTextColor: false,

                // 让文本颜色继承目标元素的 fill 属性值
                // getLabelFillFromSprite: true,

                // [bold #f00] [/] 是 text styling
                labelText: "[bold #E60013]{name}[/]\n\n{library}"
            });

            // 自定义背景色
            tooltip.get("background").setAll({
                fill: am5.color(0xffffff),
                fillOpacity: .8
            });

            tooltip.label.setAll({
                fill: am5.color(0x333333)
            });

            let circle = container.children.push(
                am5.Circle.new(root, {
                    radius: 4,
                    tooltipY: 0,
                    fill: colorset.next(),
                    strokeOpacity: 0
                })
            );

        
            let circle2 = container.children.push(
                am5.Circle.new(root, {
                    tooltipY: 0,
                    radius: 4,
                    fill: colorset.next(),
                    strokeOpacity: 0,
                    tooltipText: " ",
                    tooltip: tooltip
                })
            );
        
            circle.animate({
                key: "scale",
                from: 1,
                to: 5,
                duration: 600,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });

            circle.animate({
                key: "opacity",
                from: 1,
                to: 0,
                duration: 600,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });
        
            return am5.Bullet.new(root, {
                sprite: container
            });
        });

        let cities = [
            {
                title: "德国",
                museum: `德国柏林国立图书馆、巴伐利亚州立东亚图书馆`,
                latitude: 52.5167,
                longitude: 13.0333
            },
            {
                title: "法国",
                museum: "法国国家图书馆",
                latitude: 48.8567,
                longitude: 2.351
            },
            {
                title: "俄罗斯",
                museum: "圣彼得堡国立大学、俄罗斯国立图书馆",
                latitude: 59.9167,
                longitude: 30.4167
            },
            {
                title: "英国",
                museum: `大英图书馆、剑桥大学图书馆、博德利图书馆、\nChester Beatty博物馆`,
                latitude: 51.5002,
                longitude: -0.1262
            },
            {
                title:'中国大陆',
                museum: `北京故宫博物院、中国国家图书馆`,
                latitude: 39.9056,
                longitude: 116.3958
            },
            {
                title:'日本',
                museum: `内阁文库、国立国会图书馆、早稻田大学图书馆、\n京都大学图书馆、宫内厅书陵部、关西大学图书馆、\n东京博物馆等等`,
                latitude: 35.6785,
                longitude: 139.6823
            },
            {
                title: "巴西",
                museum: "巴西国家图书馆",
                latitude: -22.9000,
                longitude: -43.2500
            },
            {
                title: "加拿大",
                museum: "多伦多大学郑裕彤东亚图书馆、阿尔伯塔大学博物馆",
                latitude: 43.0667,
                longitude: -79.3667
            },
            {
                title: "美国",
                museum: `哈佛大学图书馆、美国国会图书馆、伯克利图书馆、\n互联网档案馆、普林斯顿大学图书馆、大都会博物馆、\n克利夫兰艺术博物馆、弗瑞尔·赛克勒美术馆等等`,
                latitude: 42.3167,
                longitude: -71.0833
            },
            {
                title: "中国香港",
                museum: "香港中文大学图书馆",
                latitude: 22.2833,
                longitude: 114.1333
            },
            {
                title: "中国台湾",
                museum: "台北故宫博物院、台北国家图书馆",
                latitude: 25.0333,
                longitude: 121.6333
            },
            {
                title: "澳大利亚",
                museum: "澳大利亚国家图书馆",
                latitude: -35.3000,
                longitude: 149.1333
            }
        ];

        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            addCity(city.longitude, city.latitude, city.title, city.museum);
        }
        
        function addCity(longitude, latitude, title, museum) {
            pointSeries.data.push({
                geometry: { type: "Point", coordinates: [longitude, latitude] },
                name: title,
                library: museum
            });
        }
        
        // Make stuff animate on load
        chart.appear(1000, 100);
    }
}
</script>

<style scoped>
#map-container{
    width: 100%;

    /* 高度暂时固定，后面再修改 */
    height: 611px;

    display: flex;
    
}

#mapChart{
    margin: 40px 20px;
    
    width: 60%;
    height: 100%;
    
}

#text{
    width: 40%;
    margin: 20px;
    position: relative;
}

#text-wrap{
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

#bigIcon_wrap{
    margin-bottom: 50px;
}

.bigIcon{
    font-size: 50px;
    color: #0099FF;
}
</style>