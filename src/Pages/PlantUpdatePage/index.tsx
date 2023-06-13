import React from 'react';
import { useParams } from 'react-router-dom';

export default function PlantUpdatePage() {

  const { id } = useParams()

  return (
    <p>PlantUpdatePage Works !</p>
  )
}