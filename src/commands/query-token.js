const { SlashCommandBuilder } = require("discord.js");
const { fetchToken } = require("../functions/query-token");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");
const { writeToFile } = require("../writeToFile");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
  NoSubscriberBehavior,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nftoken")
    .setDescription(
      "Gets data on a single NFT given a contract address and tokenId"
    )
    .addStringOption((option) =>
      option
        .setName("address")
        .setRequired(true)
        .setDescription("The address of the collection")
    )
    .addStringOption((option) =>
      option
        .setName("token_id")
        .setRequired(true)
        .setDescription("The ID of the token")
    ),
  async execute(interaction) {
    let address = interaction.options.get("address").value;
    let tokenId = interaction.options.get("token_id").value;
    await interaction.deferReply();
    try {
      let token = await fetchToken(address, tokenId);
      writeToFile("query-audio-token", token);
      let audioToken = false;
      let audioURL = "";
      let embeds = [];
      let embed = new EmbedBuilder()
        .setTitle(`Token Details for ${token.token.token.name}`)
        .setDescription(token.token.token.description)
        .setThumbnail(token.token.token.content.mediaEncoding.thumbnail)
        .setColor(0x00ffff)
        .setAuthor({
          name: "Zora",
          iconURL: "https://zora.co/assets/og-image.png",
        })
        .addFields(
          { name: "TOKEN ID", value: token.token.token.tokenId, inline: true },
          {
            name: "COLLECTION NAME",
            value: token.token.token.tokenContract.name,
            inline: true,
          },
          {
            name: "SYMBOL",
            value: token.token.token.tokenContract.symbol,
            inline: true,
          },
          {
            name: "COLLECTION ADDRESS",
            value: token.token.token.tokenContract.collectionAddress,
          },
          { name: "OWNER ADDRESS", value: token.token.token.owner },
          {
            name: "NETWORK",
            value: token.token.token.tokenContract.network,
            inline: true,
          },
          {
            name: "MINT PRICE",
            value: `${token.token.token.mintInfo.price.usdcPrice.decimal} USDC`,
            inline: true,
          }
        );
      embeds.push(embed);

      if (
        token.token.token.content.mediaEncoding.__typename ===
        "AudioEncodingTypes"
      ) {
        audioToken = true;
        audioURL = token.token.token.content.url;
      }

      function JoinChannel(channel, url, volume) {
        console.log(url);
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guildId,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
          },
        });
        let resource = createAudioResource(url, { inlineVolume: true });
        connection.subscribe(player);
        resource.volume.setVolume(volume);
        connection.on(VoiceConnectionStatus.Ready, () => {
          console.log("ready");
          player.play(resource);
        });
        connection.on(
          VoiceConnectionStatus.Disconnected,
          async (oldState, newState) => {
            try {
              console.log("Disconnected.");
              await Promise.race([
                entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
              ]);
            } catch (error) {
              connection.destroy();
            }
          }
        );
        player.on("error", (error) => {
          console.error(
            `Error: ${error.message} with resource ${error.resource.metadata.title}`
          );
          player.play(getNextResource());
        });
        player.on(AudioPlayerStatus.Playing, () => {
          console.log("The audio player has started playing!");
        });
        player.on("idle", () => {
          connection.destroy();
        });
        player.play(resource);
      }

      let paginationContent = await pagination({
        embeds: embeds, // Array of embeds objects
        author: interaction.member.user,
        interaction: interaction,
        ephemeral: true,
        time: 40000, // 40 seconds
        fastSkip: false,
        pageTravel: false,
        buttons: [
          {
            value: TypesButtons.previous,
            label: "Previous Page",
            style: StylesButton.Primary,
            emoji: null,
          },
          {
            value: TypesButtons.next,
            label: "Next Page",
            style: StylesButton.Success,
            emoji: null,
          },
        ],
      });
      await interaction.editReply(paginationContent);
      if (audioToken) {
        // console.log(audioURL)
        await interaction.followUp(
          "This is a Audio Token Join a VC to listen to the audio"
        );
        let voiceChannel = interaction.member.voice.channel;
        // console.log(interaction.member.voice.channel)
        if (!voiceChannel) {
          await interaction.followUp("Please join a voice channel and try again");
        } else {
          JoinChannel(voiceChannel, audioURL, 0.5);
        }
      }
    } catch (err) {
      await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

  },
};
