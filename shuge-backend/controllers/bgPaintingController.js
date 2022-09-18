const bgPainting = require('../model/bgPainting');

const bgPaintingController = {
    all(req, res){
        bgPainting
          .find({})
          .exec((err, paints) => {
            if(err) return res.status(500).send({message: "无法处理请求"});
            res.status(200).json(paints)
          })
    },
    byId(req, res){
        const idParams = req.params.id;

        bgPainting
          .findOne({ _id: idParams })
          .exec((err, paints) => {
            if (err)  return res.status(500).send({message: "无法处理请求"}); 

            if(paints){
                res.status(200).json(paints);
            }else {
                res.status(200).send("抱歉暂未收录该字图");
            }
          })

    },
    create(req, res){
        const newPaints = new bgPainting( req.body );

        bgPainting
          .findOne({ title: req.body.title })
          .exec((err, founded_Paints) => {
            if (err)  return res.status(500).send({ message: "无法处理请求" }); 

            if ( founded_Paints ) {
                res.status(200).send("该字画已收录")
            }else {
                newPaints.save((err) => {
                    if (err) return res.status(500).send({message: "保存失败"});
                    
                    res.status(200).json(newPaints);
                })
            }
          })

    },
    update(req, res){
        res.send('暂未实现')
    },
    random(req, res){
        bgPainting
          .aggregate()
          .project( {_id: 1, image: 1, title: 1} )
          .sample(1)
          .exec((err, result) => {
            if ( err ) return res.status(500).send({message: "无法处理请求"});
            res.status(200).json(result);
          })
    }
}

module.exports = bgPaintingController;
