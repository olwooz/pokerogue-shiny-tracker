import requests
import json
from tqdm import tqdm

BASE_URL = "https://pokeapi.co/api/v2"
OUTPUT_FILE = "pokemon_data.json"
POKEMON_LIMIT = 1025  # Stop at Pecharunt

def get_all_pokemon():
    """Fetch all Pokémon names and URLs."""
    print("Fetching Pokémon list...")
    response = requests.get(f"{BASE_URL}/pokemon?limit={POKEMON_LIMIT}&offset=0")
    response.raise_for_status()
    return response.json()["results"]

def get_pokemon_details(pokemon_url):
    """Fetch sprite URL and species info."""
    data = requests.get(pokemon_url).json()
    sprite_url = data["sprites"]["front_default"]
    species_url = data["species"]["url"]
    return sprite_url, species_url

def get_generation(species_url):
    """Fetch generation number from species data."""
    species_data = requests.get(species_url).json()
    gen_url = species_data["generation"]["url"]
    return int(gen_url.rstrip("/").split("/")[-1])

def main():
    all_pokemon = get_all_pokemon()
    pokemon_data = {}

    print("Fetching detailed data for each Pokémon...")
    for i, p in enumerate(tqdm(all_pokemon, desc="Processing Pokémon")):
        dex_id = i + 1
        if dex_id > POKEMON_LIMIT:
            break
        try:
            sprite, species_url = get_pokemon_details(p["url"])
            generation = get_generation(species_url)
            pokemon_data[dex_id] = {
                "name": p["name"].capitalize(),
                "generation": generation,
                "sprite": sprite
            }
        except Exception as e:
            print(f"⚠️ Skipping {p['name']}: {e}")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(pokemon_data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Done! Saved {len(pokemon_data)} Pokémon to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
