import React, {Component} from 'react'
import ListaPessoas from './ListaPessoas';
import './Formulario.css'
import axios from 'axios'

class Formulario extends Component {
   
    constructor(props){
        super(props)

        this.state = {
            id:'',
            nome:'',
            email:'',
            senha:'',
            alterarForm:false,
            pessoas:[],
        }
        this.mudarForm = this.mudarForm.bind(this)
        this.handleChangeId = this.handleChangeId.bind(this)
        this.handleChangeNome = this.handleChangeNome.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeSenha = this.handleChangeSenha.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
        this.submitHandle = this.submitHandle.bind(this) 
    }
    
    componentDidMount() {
        this.obterPessoas()
    }

    handleChangeId(event)  {
        this.setState({ id:event.target.value })
    }

    handleChangeNome(event)  {
        this.setState({ nome:event.target.value })
    }
    handleChangeEmail(event) {
        this.setState({ email:event.target.value })
    }

    handleChangeSenha(event) {
        this.setState({ senha:event.target.value })
    }

    gravar(nome,email,senha){
        const url = 'http://localhost:3000/pessoas'

        axios.post(url,{
                nome: nome,
                email: email,
                senha: senha
            }).then(res => {
                this.obterPessoas()
                this.limparCampos()
            })   
    }

    editar(id,pessoa){
        const url = 'http://localhost:3000/pessoas'

        axios.put(`${url}/${id}` , pessoa).then(res => {
            this.obterPessoas()
            this.limparCampos()
            this.setState({alterarForm:false})
  
          })
          .catch(err => {
            this.setState({alterarForm:false})
            console.log(err);
          });
    }

    submitHandle (event){
        event.preventDefault()

        let nome = this.state.nome;
        let email = this.state.email
        let senha = this.state.senha
        
        this.gravar(nome,email,senha) 
    }

    limparCampos() {
        this.setState({id:'',  nome:'', email:'', senha:'',})
    }

    async  obterPessoas() {
        const url = 'http://localhost:3000/pessoas'

        await   axios.get(url).then(res =>{
            const pessoas = res.data;

            this.setState({ pessoas: pessoas })
        }).catch((err) =>{
            console.log('err',err)
        })
    }

    handleRemove (pessoa) {
        const url = `http://localhost:3000/pessoas`;

        axios.delete(`${url}/${pessoa.id}`).then(res => {
            this.obterPessoas()
            this.setState( { pessoas: res.data });

          })
          .catch(err => {
            console.log(err);
        });
    };

    

    submitEdit (event){
      
      event.preventDefault()
      const id = this.state.id

      let pessoa = {
        nome:this.state.nome,
        email:this.state.email,
        senha:this.state.senha,
      }

      this.editar(id,pessoa)

    };

    mudarForm (event){
      event.preventDefault()
      this.setState({alterarForm:true})
    };

    voltarForm (){
        this.setState({alterarForm:true})
    };

    formulario(){
      const {id,nome,email,senha,alterarForm } = this.state

        return(
          <div>
              <h2>Formulario React</h2>
              {
                  !alterarForm ? 
                        <form onSubmit={this.submitHandle}>
                            
                            <label >Nome</label>
                            <br/> <input onChange={this.handleChangeNome} value={nome} type="text" name="nome" placeholder="Digite o Nome" />
                            <br/><label >Email</label>
                            <br/> <input onChange={this.handleChangeEmail} value={email} type="text" name="email" placeholder="Digite o Email" />
                            <br/><label >Senha</label>
                            <br/><input onChange={this.handleChangeSenha} value={senha} type="password" name="senha"  placeholder="Digite a Senha" />
                            <br/><br/>
                            
                            <button  > Gravar Dados</button>
                            
                            
                        </form>
                      :
                        <form onSubmit={this.submitEdit}>
                            <div>
                                <label >Id</label>
                                <br/>   <input  onChange={this.handleChangeId} value={id} type="text" name="id" placeholder="Digite o Id" />
                                <br/> <label >Nome</label>
                                <br/> <input  onChange={this.handleChangeNome} value={nome} type="text" name="nome" placeholder="Digite o Nome" />
                                <br/> <label >Email</label>
                                <br/> <input onChange={this.handleChangeEmail} value={email} type="text" name="email" placeholder="Digite o Email" />
                                <br/> <label >Senha</label>
                                <br/> <input  onChange={this.handleChangeSenha} value={senha} type="password" name="senha"  placeholder="Digite a Senha" />
                                <br/> <br/><button > Atualizar Dados</button> &nbsp;
                                <button  onClick={() => this.voltarForm()}> Voltar</button>
                           </div>
                        </form>
              }
          </div>
        )
    }

    render(){
        return(
            <div>
                <div style={{alignItems:'center'}}>
                    {this.formulario()}
                </div>
                <hr/>
                <div>
                    <ListaPessoas removeClick={this.handleRemove} pessoas={this.state.pessoas} onChange={()=> this.obterPessoas() } mudarForm={this.mudarForm} />
                </div>
            </div>
        )


    }


}

export default Formulario;
