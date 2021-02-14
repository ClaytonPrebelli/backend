const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//retorna todos os colaboradores
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM colaborador',
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(200).send(resultado)
            }
        )
    })

});

//insere
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        conn.query(
            'INSERT INTO colaborador (nome, rg, cpf, telefone, email, nascimento, admissao, cargo, vr, vt, salario) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.nome, req.body.rg, req.body.cpf, req.body.telefone, req.body.email, req.body.nascimento, req.body.admissao, req.body.cargo, req.body.vr, req.body.vt, req.body.salario],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: "Colaborador Inserido",
                    _id: resultado.insertId
                })
            }

        )
    })



});


// retorna um pelo id
router.get('/:_id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM colaborador WHERE _id = ?;',
            [req.params._id],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(200).send({_id:req.params._id,
nome:resultado[0].nome,rg:resultado[0].rg,cpf:resultado[0].cpf,telefone:resultado[0].telefone,email:resultado[0].email,nascimento:resultado[0].nascimento,admissao:resultado[0].admissao,cargo:resultado[0].cargo,vr:resultado[0].vr,vt:resultado[0].vt,salario:resultado[0].salario})
            }
        )
    })

});
router.put('/:_id', (req, res, net) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            `UPDATE colaborador
            SET nome = ?,
                rg = ?, cpf = ?, telefone = ?, email = ?, nascimento = ?, admissao = ?, cargo = ?, vr = ?, vt = ?, salario = ?
                WHERE _id = ?
            `,
            [req.body.nome, req.body.rg, req.body.cpf, req.body.telefone, req.body.email, req.body.nascimento, req.body.admissao, req.body.cargo, req.body.vr, req.body.vt, req.body.salario, req.params._id],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(202).send({ response: resultado })
            }
        )
    })

});

router.delete('/:_id', (req, res, net) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'DELETE FROM colaborador WHERE _id = ?',
            [req.params._id],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(202).send({ response: resultado })
            }
        )
    })
});

module.exports = router;

