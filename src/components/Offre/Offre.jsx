import React, { useEffect, useState } from "react";
import axios from "axios";

const Offre = () => {
  const [offres, setOffre] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/offre")
      .then(res => setOffre(res.data))
      .catch(err => console.log("Erreur chargement offres:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Nos Offres
      </h2>

      {offres.length === 0 ? (
        <p style={{ textAlign: "center" }}>Aucune offre disponible</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {offres.map((offre) => (
            <div key={offre._id} style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}>

              {/* Image */}
              {offre.image && (
                <img
                  src={`http://localhost:5000/uploads/${offre.image}`}
                  alt={offre.nom}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              )}

              {/* Nom */}
              <h3 style={{ marginTop: "10px" }}>{offre.nom}</h3>

              {/* Catégorie */}
              <p><strong>Catégorie:</strong> {offre.categorie}</p>

              {/* Description */}
              <p>{offre.description}</p>

              {/* Prix */}
              <p><strong>Prix:</strong> {offre.prix} TND</p>

              {/* Dates */}
              <p>
                <strong>Du:</strong> {new Date(offre.dateDebut).toLocaleDateString()}
                {" "} - {" "}
                <strong>Au:</strong> {new Date(offre.dateFin).toLocaleDateString()}
              </p>

              {/* Disponibilité */}
              <p>
                <strong>Statut:</strong>{" "}
                {offre.disponibilite ? (
                  <span style={{ color: "green" }}>Disponible</span>
                ) : (
                  <span style={{ color: "red" }}>Indisponible</span>
                )}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offre;