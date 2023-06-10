import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PlanteService from "../../services/PlanteService";
import AuthService from "../../services/AuthService";

export default function PlantPage() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await PlanteService.getPlantById(id)
                .then((data) => {
                  console.log(data)
                  setData(data)
                })
                .catch(() => {
                    AuthService.clearStorage();
                    navigate("/login");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchData();
    }, []);

    if(isLoading) {
      return (
        <p>loading...</p>
      )
    }

    if (data === null) {
        return <p>Erreur de chargement.</p>;
    }

    return <p>{data}</p>;
}
