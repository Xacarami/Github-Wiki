import { useState } from "react";
import gitlogo from "../assets/github-11-512.png"
import Input from "../components/input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";

import { Container } from "./styles"
import { api } from "../services/api";

function App() {

  const [currentRepo, setCurrentRepo] = useState("")
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)

    if (data.id) {

      const exist = repos.find(repo => repo.id === data.id)

      if(!exist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo("")
        return
      }

    }

    alert("Repositório não encontrado")
  }

  const handleRemoveRepo = (id) =>{
    let entendendo = repos.filter(e => e.id !== id)
    setRepos(entendendo)
  }

  return (
    <Container>
      <img src={gitlogo} width={70} height={70} alt="github Logo" />
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
