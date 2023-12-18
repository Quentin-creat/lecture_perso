
# Musiage

Le projet vise à créer un lecteur audio web complet et interactif, offrant une expérience utilisateur riche avec des fonctionnalités personnalisées. Il intègre des visualisations audio dynamiques, des contrôles interactifs, et une gestion flexible des listes de lecture.


## Badges

[![Render.com](https://img.shields.io/badge/render.com-deploy-green)](https://musiage.onrender.com)

## Auteurs

- [Johann Avramov](https://www.github.com/Nogaruki)
- [Quention Guillou](https://www.github.com/qQuentin-creat)


## Demo

Insert gif or link to demo


## 🛠 Skills
Javascript, HTML, CSS


## Caractéristiques

- Affichae de la playliste
- Système de selection intuitive
- Visualizer
- Gestion du son
- Gestion du temps

## Code couleur

| Couleur             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Black | ![#02010A](https://via.placeholder.com/10/02010A?text=+) #02010A |
| Oxford Blue | ![#04052E](https://via.placeholder.com/10/04052E?text=+) #04052E |
| Federal blue | ![#140152](https://via.placeholder.com/10/140152?text=+) #140152 |
| Navy blue | ![#22007C](https://via.placeholder.com/10/22007C?text=+) #22007C |
| Duke blue | ![#0D00A4](https://via.placeholder.com/10/0D00A4?text=+) #0D00A4 |


## Démarrer en local

Cloner le projet

```bash
  git clone https://github.com/Quentin-creat/lecture_perso.git
```

Aller dans le dossier du projet et lancer sur un serveur local __index.html__




## Schéma d'appel

![Schéma_d-appel](https://raw.githubusercontent.com/Quentin-creat/lecture_perso/Johann/img/Diagram_Musiage.svg)


## Détail des fichiers

### webaudio-controls.js
Le script `webaudio-controls.js` est une bibliothèque JavaScript complète pour créer des contrôles audio interactifs dans les applications web. Il est basé sur plusieurs projets précédents, intégrés et améliorés par g200kg (Tatsuya Shinyagaito), et est sous licence Apache 2.0. Voici un résumé des fonctionnalités et des composants clés de la bibliothèque :

#### Fonctionnalités Principales
- **Contrôles Audio Personnalisables** : Permet la création de boutons, curseurs, commutateurs, et d'autres contrôles pour les applications audio web.
- **Support MIDI** : Intègre des fonctionnalités pour le contrôle MIDI, permettant aux utilisateurs d'interagir avec les éléments de l'interface via des appareils MIDI.
- **Conception Réactive et Personnalisable** : Les contrôles peuvent être stylisés et adaptés pour s'intégrer de manière transparente dans différentes interfaces utilisateur.



### main.js

`main.js` agit comme le coordinateur principal, reliant toutes les parties du lecteur audio. En définissant des éléments personnalisés, il facilite l'intégration et l'interaction de ces composants dans la page web, créant ainsi une expérience utilisateur cohérente et fonctionnelle.

### Audioplayer.js
Le fichier `AudioPlayer.js` définit une classe `AudioPlayer` qui étend `HTMLElement`, indiquant qu'il s'agit d'un élément web personnalisé pour le lecteur audio. Voici une analyse détaillée de ses composants et fonctionnalités :

#### Propriétés
- **État de lecture, volume, et autres**: Gère l'état de lecture (`playing`), le volume (`volume` et `prevVolume`), et d'autres propriétés comme `bufferPercentage`.
- **Attributs non-audio**: Un ensemble (`nonAudioAttributes`) pour distinguer les attributs qui ne sont pas directement liés à l'élément audio.

#### Constructeur
- **Initialisation de l'ombre DOM**: Crée un shadow DOM pour encapsuler le style et la structure de l'élément.
- **Rendu initial**: Appelle la fonction `render()` pour construire l'UI initiale.

#### Méthodes statiques
- **observedAttributes**: Liste les attributs qui, lorsqu'ils changent, doivent déclencher `attributeChangedCallback`.

#### Callbacks
- **attributeChangedCallback**: Réagit aux changements d'attributs, mettant à jour l'élément et son état en fonction des modifications.
- **updateAudioAttributes**: Met à jour les attributs de l'élément audio.

#### Initialisation et Gestion Audio
- **initializeAudio**: Initialise le contexte audio, les nœuds de gain et d'analyse, et configure le flux audio.
- **updateFrequency**: Met à jour les données de fréquence pour la visualisation audio.

#### Écouteurs d'événements (Listeners)
- **attachEvents**: Attache des écouteurs d'événements pour gérer les interactions utilisateur comme la lecture/pause, le changement de volume, et la navigation dans la piste audio.

#### Fonctionnalités de Lecture
- **togglePlay**: Bascule entre la lecture et la pause.
- **changeVolume**: Ajuste le volume audio.
- **toggleMute**: Active/désactive le mode muet.
- **seekTo**: Permet de naviguer à un moment spécifique de la piste audio.
- **updateAudioTime**: Met à jour l'affichage du temps de lecture.

#### Gestion de l'interface utilisateur (UI)
- **render**: Construit l'interface utilisateur de l'élément, incluant les boutons, la barre de progression, et les indicateurs de volume.
- **updateAudio**: Met à jour l'élément audio avec une nouvelle source et un nouveau titre.

#### Conclusion
La classe `AudioPlayer` est un composant clé dans le projet, gérant l'interaction entre l'utilisateur et le lecteur audio. Elle combine des fonctionnalités avancées de l'API Web Audio avec des éléments personnalisés pour créer une expérience utilisateur riche et interactive.

### Song.js
Le fichier `Song.js` définit une classe `Song` qui étend `HTMLElement`, indiquant qu'il s'agit d'un élément web personnalisé représentant une chanson dans le lecteur audio. Voici une analyse détaillée de ses composants et fonctionnalités :

#### Méthodes Statiques
- **getObservedAttributes**: Retourne un tableau des attributs observés (`src`, `title`, `cover`), indiquant quels changements d'attributs doivent être surveillés.

#### Constructeur
- **Initialisation et Attributs**: Le constructeur appelle `super()` pour hériter de `HTMLElement`, crée un shadow DOM, et initialise les propriétés `src`, `title`, et `cover` à partir des attributs de l'élément.
- **Rendu Initial**: Appelle la méthode `render()` pour construire l'interface utilisateur initiale de la chanson.

#### Méthodes de Cycle de Vie
- **connectedCallback**: Déclenché lorsque l'élément est inséré dans le DOM. Ajoute un écouteur d'événements sur le bandeau de la chanson pour gérer les clics et propager un événement personnalisé (`songSelected`) avec les détails de la chanson.

#### Gestion de l'Interface Utilisateur
- **render**: Construit l'interface utilisateur de l'élément chanson, incluant l'image de couverture, le titre et la source (src). Le HTML est injecté dans le shadow DOM pour un style et une structure isolés.

#### Écouteur d'Événements et Interaction
- Le code dans `connectedCallback` permet à l'élément `Song` de réagir aux interactions utilisateur. Lorsqu'un utilisateur clique sur le bandeau de la chanson, un événement personnalisé (`songSelected`) est déclenché, contenant les détails de la chanson (source et titre). Cet événement peut être écouté par d'autres composants du lecteur audio, permettant une interaction entre les composants.

#### Conclusion
La classe `Song` est un composant essentiel pour représenter visuellement chaque chanson dans le lecteur audio. Elle gère l'affichage des informations de la chanson et permet une interaction facile avec l'utilisateur, facilitant la sélection et la lecture des chansons.

### Playlist.js
Le fichier `Playlist.js` définit une classe `Playlist` qui étend `HTMLElement`, indiquant qu'il s'agit d'un élément web personnalisé pour gérer une liste de lecture dans le lecteur audio. Voici une analyse détaillée de ses composants et fonctionnalités :

#### Constructeur
- **Initialisation**: Le constructeur crée un shadow DOM et initialise un tableau `songs` pour stocker les éléments de la liste de lecture, ainsi qu'un indice `currentSongIndex` pour suivre la chanson actuelle.

#### Méthodes
- **shiftFocus(delta)**: Change la chanson actuellement focalisée en fonction d'un déplacement relatif (`delta`). Déclenche un événement `songSelected` avec les détails de la nouvelle chanson sélectionnée.
- **updateSongFocus(index)**: Met à jour visuellement la chanson active et la fait défiler dans la vue.
- **connectedCallback**: Ajoute des écouteurs d'événements pour la navigation dans la liste de lecture et la sélection de chansons. Initialise l'affichage de la liste de lecture.
- **playNextSong**: Sélectionne la prochaine chanson de la liste et déclenche un événement `songSelected`.
- **render**: Construit l'interface utilisateur de la liste de lecture, incluant les éléments `custom-song` pour chaque chanson et des flèches pour la navigation.

#### Gestion des Événements
- **Écouteurs d'événements dans connectedCallback**: Gère les clics sur les chansons individuelles et les flèches de navigation. L'écouteur pour l'événement `playNextSong` permet de passer automatiquement à la chanson suivante.
- **Déclenchement des événements `songSelected`**: Lorsqu'une chanson est sélectionnée ou que la liste doit passer à la chanson suivante, un événement `songSelected` est déclenché pour informer les autres composants du lecteur audio de la chanson actuellement sélectionnée.

#### Interface Utilisateur
- **Structure HTML dans render**: Crée une interface de liste de lecture avec des éléments de chanson personnalisés (`custom-song`) et des contrôles de navigation. La mise en page et le style sont définis via CSS lié.

#### Conclusion
La classe `Playlist` joue un rôle crucial dans la gestion de la liste de lecture du lecteur audio, offrant une interface interactive pour la sélection et la navigation des chansons. Elle facilite l'intégration entre la liste de lecture et les autres composants du lecteur, tels que le contrôle principal de la musique et la visualisation.

### Visualizer.js
Le fichier `Visualizer.js` définit une classe `Visualizer` qui étend `HTMLElement`, ce qui indique qu'il s'agit d'un élément web personnalisé conçu pour visualiser l'audio dans le lecteur audio. Voici une analyse détaillée de ses composants et fonctionnalités :

#### Constructeur
- **Initialisation**: Le constructeur initialise des propriétés comme `barWidth` et `barGap`, et crée un shadow DOM pour isoler le style et la structure de l'élément.
- **Attachement du shadow DOM**: Le shadow DOM est attaché avec un mode `open` pour permettre l'interaction avec le contenu encapsulé.

#### Méthodes de Cycle de Vie
- **connectedCallback**: Déclenché lorsque l'élément est inséré dans le DOM. Appelle la méthode `render()` pour construire le canvas de visualisation.

#### Méthodes
- **updateFrequency(dataArray, bufferLength, bufferPercentage)**: Met à jour le canvas de visualisation en fonction des données de fréquence. Cette méthode dessine des barres sur le canvas en fonction de l'intensité des fréquences audio.
   - **Effacement et Préparation du Canvas**: Efface le canvas et prépare la zone de dessin.
   - **Calcul des Barres**: Calcule la position et la hauteur de chaque barre en fonction des données de fréquence.
   - **Dessin des Barres**: Dessine chaque barre sur le canvas en utilisant les données calculées.

#### Rendu de l'Interface Utilisateur
- **render**: Construit l'interface utilisateur de l'élément visualisateur, incluant un élément `canvas`.
   - **Configuration du Canvas**: Définit la taille et le contexte 2D du canvas.
   - **Gestion de la Résolution**: Ajuste la résolution du canvas pour s'adapter aux différents dispositifs d'affichage (par exemple, les écrans à haute densité de pixels).

#### Conclusion
La classe `Visualizer` est un composant essentiel pour la représentation visuelle des données audio dans le lecteur audio. Elle utilise les techniques de dessin sur canvas pour créer une visualisation dynamique et esthétique des fréquences audio, enrichissant ainsi l'expérience utilisateur avec des effets graphiques qui accompagnent la musique jouée.
