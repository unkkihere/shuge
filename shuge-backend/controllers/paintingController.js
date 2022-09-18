const Painting = require('../model/painting');

const paintingController = {
    latest(req, res){
        Painting
          .find({})
          .sort({includedTime: -1})
          .select({ _id: 1, title: 1, image: 1})
          .limit(6)
          .exec((err, paints) => {
            if(err) return res.status(500).send({message: "无法处理请求"});
            
            res.status(200).json(paints)
          })
    },
    byId(req, res){
        const idParams = req.params.id;

        Painting
          .findOne({ _id: idParams })
          .exec((err, paints) => {
            if (err) return res.status(500).send({message: "无法处理请求"});

            if(paints){
                res.status(200).json(paints);
            }else {
                res.status(200).send({message: "该幅字画不存在"});
            }
          })

    },
    create(req, res){
        const newPaints = new Painting( req.body );

        Painting
          .findOne({ title: req.body.title })
          .exec((err, founded_Paints) => {
            if (err) return res.status(500).send({message: "无法处理请求"});

            if ( founded_Paints ) {
                res.status(200).send("该字画已收录");
            }else {
                newPaints.save((err) => {
                    if (err) return res.status(500).send({message: "保存失败"});
                    
                    res.status(200).json(newPaints);
                })
            }
          })

    },
    like(req, res){

        const idParams = req.params.id;
        
        Painting
          .findOne( { _id: idParams } )
          .exec((err, paints) => {
            if (err) return res.status(500).send({message: "无法处理请求"});

            paints.likes += 1;
            paints.save((err) => {
                if(err) return res.status(500).send({message: "保存失败"});
                res.status(200).json({ likes: paints.likes });
            })
            
          })
    },
    update(req, res){
      res.status(200).send('暂未实现');
    },
    random(req, res){
      Painting
        .aggregate()
        .project( {_id: 1, image: 1, title: 1} )
        .sort({includedTime: -1})
        .skip(6)
        .sample(8)
        .exec((err, result) => {
          if (err) return res.status(500).send({message: "无法处理请求"});
          res.status(200).json(result);
        })
    }
}

module.exports = paintingController;
