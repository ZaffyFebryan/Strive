import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import BottomNavigation from '../../components/navigation/BottomNavigation';

// ⭐ CATAT
import AddActivitySheet from '../../components/activity/AddActivitySheet';


// ============================================================
// INTERACTION BOTTOM SHEET
// KOMENTAR + LIKE
// ============================================================

function InteractionBottomSheet({
  visible,
  onClose,
  post,
  initialTab = 'comments',
}) {

  // ==========================================================
  // ACTIVE TAB
  // ==========================================================

  const [activeTab, setActiveTab] =
    useState(initialTab);


  // ==========================================================
  // COMMENT MESSAGE
  // ==========================================================

  const [message, setMessage] =
    useState('');


  // ==========================================================
  // UPDATE TAB SETIAP KALI SHEET DIBUKA
  // ==========================================================

  useEffect(() => {

    if (visible) {

      setActiveTab(initialTab);

      setMessage('');

    }

  }, [visible, initialTab]);


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // ⭐ Emoji
    emoji:
      require('../../../assets/emoji.png'),

    // ⭐ Panah kirim
    send:
      require('../../../assets/panahkirim.png'),

    // Like
    like:
      require('../../../assets/suka.png'),

  };


  // ==========================================================
  // COMMENTS DATA
  // ==========================================================

  const comments = [

    {
      id: '1',

      name: 'Budi Anto',

      time: '12 menit yang lalu',

      text:
        'Mantap Coach! Konsistensi yang luar biasa di tengah jadwal padat harian',

      image:
        require('../../../assets/budi.png'),
    },


    {
      id: '2',

      name: 'Citra Dewi',

      time: '54 menit yang lalu',

      text:
        'Melihat progres angkatan Anda membuat saya jadi termotivasi untuk tidak absen latihan hari ini',

      image:
        require('../../../assets/citra.png'),
    },


    {
      id: '3',

      name: 'John No',

      time: '1 jam yang lalu',

      text:
        'Postur yang sangat bagus. Angkatan berat seperti ini memang wajib mengutamakan keselamatan sendi',

      image:
        require('../../../assets/john.png'),
    },


    {
      id: '4',

      name: 'Ken Ekopo',

      time: '1 jam yang lalu',

      text:
        'Definisi investasi masa tua yang sesungguhnya. Menyala terus semangatnya!',

      image:
        require('../../../assets/sara.png'),
    },


    {
      id: '5',

      name: 'Ara',

      time: '1 jam yang lalu',

      text: '',

      image:
        require('../../../assets/citra.png'),
    },

  ];


  // ==========================================================
  // LIKES DATA
  // ==========================================================

  const likes = [

    {
      id: '1',

      name: 'Budi Anto',

      image:
        require('../../../assets/budi.png'),
    },


    {
      id: '2',

      name: 'Citra Dewi',

      image:
        require('../../../assets/citra.png'),
    },


    {
      id: '3',

      name: 'Ara',

      image:
        require('../../../assets/citra.png'),
    },


    {
      id: '4',

      name: 'Ken',

      image:
        require('../../../assets/sara.png'),
    },


    {
      id: '5',

      name: 'John No',

      image:
        require('../../../assets/john.png'),
    },


    {
      id: '6',

      name: 'Messi',

      image:
        require('../../../assets/budi.png'),
    },


    {
      id: '7',

      name: 'Jordan',

      image:
        require('../../../assets/john.png'),
    },


    {
      id: '8',

      name: 'Zafy Febryan',

      image:
        require('../../../assets/citra.png'),
    },

  ];


  // ==========================================================
  // CHANGE TAB
  // ==========================================================

  const handleChangeTab = (tab) => {

    setActiveTab(tab);

  };


  // ==========================================================
  // SEND COMMENT
  // ==========================================================

  const handleSendComment = () => {

    if (!message.trim()) {
      return;
    }

    // ========================================================
    // PROTOTYPE
    // ========================================================
    // Untuk sementara pesan hanya dikosongkan.
    // Nanti bagian ini bisa dihubungkan ke backend.

    setMessage('');

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={false}
    >

      <KeyboardAvoidingView
        style={styles.sheetOverlay}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        {/* ==================================================
            BACKGROUND GELAP
        ================================================== */}

        <TouchableOpacity
          style={styles.sheetBackground}
          activeOpacity={1}
          onPress={onClose}
        />


        {/* ==================================================
            BOTTOM SHEET
        ================================================== */}

        <View
          style={styles.interactionSheet}
        >

          {/* ==================================================
              HANDLE
          ================================================== */}

          <View
            style={styles.sheetHandle}
          />


          {/* ==================================================
              HEADER TAB
          ================================================== */}

          <View
            style={styles.interactionHeader}
          >

            {/* =================================================
                KOMENTAR
            ================================================= */}

            <TouchableOpacity
              style={styles.interactionTab}
              onPress={() =>
                handleChangeTab('comments')
              }
              activeOpacity={0.8}
            >

              <Text
                style={[
                  styles.interactionTabText,

                  activeTab === 'comments' &&
                    styles.interactionTabTextActive,
                ]}
              >
                {post?.comments || '0'} Komentar
              </Text>

            </TouchableOpacity>


            {/* =================================================
                LIKE
            ================================================= */}

            <TouchableOpacity
              style={styles.interactionTab}
              onPress={() =>
                handleChangeTab('likes')
              }
              activeOpacity={0.8}
            >

              <Image
                source={ICONS.like}
                style={styles.interactionLikeIcon}
                resizeMode="contain"
              />

              <Text
                style={[
                  styles.interactionLikeCount,

                  activeTab === 'likes' &&
                    styles.interactionLikeCountActive,
                ]}
              >
                {post?.likes || '0'}
              </Text>

            </TouchableOpacity>

          </View>


          {/* ==================================================
              GARIS TAB
          ================================================== */}

          <View
            style={styles.tabLineContainer}
          >

            <View
              style={[
                styles.tabIndicator,

                activeTab === 'comments'
                  ? styles.tabIndicatorComments
                  : styles.tabIndicatorLikes,
              ]}
            />

          </View>


          {/* ==================================================
              COMMENT TAB
          ================================================== */}

          {activeTab === 'comments' ? (

            <>

              {/* =================================================
                  COMMENT LIST
              ================================================= */}

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.commentScroll}
                contentContainerStyle={
                  styles.commentList
                }
                keyboardShouldPersistTaps="handled"
              >

                {comments.map((comment) => (

                  <View
                    key={comment.id}
                    style={styles.commentItem}
                  >

                    {/* PROFILE */}

                    <Image
                      source={comment.image}
                      style={styles.commentAvatar}
                      resizeMode="cover"
                    />


                    {/* CONTENT */}

                    <View
                      style={styles.commentContent}
                    >

                      {/* NAME + TIME */}

                      <View
                        style={styles.commentNameRow}
                      >

                        <Text
                          style={styles.commentName}
                        >
                          {comment.name}
                        </Text>

                        <Text
                          style={styles.commentDot}
                        >
                          •
                        </Text>

                        <Text
                          style={styles.commentTime}
                        >
                          {comment.time}
                        </Text>

                      </View>


                      {/* COMMENT */}

                      {comment.text !== '' && (

                        <Text
                          style={styles.commentText}
                        >
                          {comment.text}
                        </Text>

                      )}

                    </View>

                  </View>

                ))}

              </ScrollView>


              {/* =================================================
                  INPUT KOMENTAR
              ================================================= */}

              <View
                style={styles.commentInputRow}
              >

                {/* =================================================
                    INPUT CONTAINER
                ================================================= */}

                <View
                  style={
                    styles.commentInputContainer
                  }
                >

                  {/* ⭐ ICON EMOJI DARI ASSETS */}

                  <TouchableOpacity
                    style={styles.emojiButton}
                    activeOpacity={0.7}
                  >

                    <Image
                      source={ICONS.emoji}
                      style={styles.emojiIcon}
                      resizeMode="contain"
                    />

                  </TouchableOpacity>


                  {/* INPUT */}

                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Ketik pesan"
                    placeholderTextColor="#686B70"
                    style={styles.commentInput}
                    returnKeyType="send"
                    onSubmitEditing={
                      handleSendComment
                    }
                  />

                </View>


                {/* =================================================
                    SEND BUTTON
                ================================================= */}

                <TouchableOpacity
                  style={styles.commentSendButton}
                  onPress={handleSendComment}
                  activeOpacity={0.8}
                >

                  {/* ⭐ ICON PANAH DARI ASSETS */}

                  <Image
                    source={ICONS.send}
                    style={styles.commentSendIcon}
                    resizeMode="contain"
                  />

                </TouchableOpacity>

              </View>

            </>

          ) : (

            /* ==================================================
               LIKE TAB
            ================================================== */

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.likeScroll}
              contentContainerStyle={
                styles.likeList
              }
            >

              {likes.map((user) => (

                <TouchableOpacity
                  key={user.id}
                  style={styles.likeUserItem}
                  activeOpacity={0.8}
                >

                  <Image
                    source={user.image}
                    style={styles.likeUserImage}
                    resizeMode="cover"
                  />

                  <Text
                    style={styles.likeUserName}
                  >
                    {user.name}
                  </Text>

                </TouchableOpacity>

              ))}

            </ScrollView>

          )}

        </View>

      </KeyboardAvoidingView>

    </Modal>

  );
}


// ============================================================
// SHARE BOTTOM SHEET
// ============================================================

function ShareBottomSheet({
  visible,
  onClose,
  post,
}) {

  const [selectedUser, setSelectedUser] =
    useState(null);


  const [message, setMessage] =
    useState('');


  const [sent, setSent] =
    useState(false);


  // ==========================================================
  // SHARE RECIPIENTS
  // ==========================================================

  const recipients = [

    {
      id: 'budi',

      name: 'Budi Anto',

      image:
        require('../../../assets/budi.png'),
    },


    {
      id: 'citra',

      name: 'Citra Dewi',

      image:
        require('../../../assets/citra.png'),
    },


    {
      id: 'john',

      name: 'John No',

      image:
        require('../../../assets/john.png'),
    },


    {
      id: 'sara',

      name: 'Sara',

      image:
        require('../../../assets/sara.png'),
    },

  ];


  // ==========================================================
  // SELECT USER
  // ==========================================================

  const handleSelectUser = (user) => {

    setSelectedUser(user.id);

  };


  // ==========================================================
  // SEND SHARE
  // ==========================================================

  const handleSendShare = () => {

    if (!selectedUser) {
      return;
    }

    setSent(true);


    setTimeout(() => {

      setSent(false);

      setSelectedUser(null);

      setMessage('');

      onClose();

    }, 1200);

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={false}
    >

      <KeyboardAvoidingView
        style={styles.sheetOverlay}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        {/* ==================================================
            BACKGROUND
        ================================================== */}

        <TouchableOpacity
          style={styles.sheetBackground}
          activeOpacity={1}
          onPress={onClose}
        />


        {/* ==================================================
            SHARE SHEET
        ================================================== */}

        <View
          style={styles.shareSheet}
        >

          {/* HANDLE */}

          <View
            style={styles.sheetHandle}
          />


          {/* TITLE */}

          <Text
            style={styles.shareTitle}
          >
            Bagikan
          </Text>


          {/* =================================================
              POST PREVIEW
          ================================================= */}

          {post && (

            <View
              style={styles.sharePostPreview}
            >

              <Image
                source={post.profileImage}
                style={styles.sharePreviewImage}
                resizeMode="cover"
              />

              <View
                style={styles.sharePreviewContent}
              >

                <Text
                  style={styles.sharePreviewName}
                  numberOfLines={1}
                >
                  {post.name}
                </Text>

                <Text
                  style={styles.sharePreviewCaption}
                  numberOfLines={2}
                >
                  {post.caption}
                </Text>

              </View>

            </View>

          )}


          {/* =================================================
              KIRIM KE
          ================================================= */}

          <Text
            style={styles.shareSectionTitle}
          >
            Kirim ke
          </Text>


          {/* =================================================
              RECIPIENT LIST
          ================================================= */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.recipientList
            }
          >

            {recipients.map((user) => {

              const isSelected =
                selectedUser === user.id;

              return (

                <TouchableOpacity
                  key={user.id}
                  style={styles.recipientItem}
                  onPress={() =>
                    handleSelectUser(user)
                  }
                  activeOpacity={0.8}
                >

                  <View
                    style={[
                      styles.recipientImageContainer,

                      isSelected &&
                        styles.recipientImageSelected,
                    ]}
                  >

                    <Image
                      source={user.image}
                      style={styles.recipientImage}
                      resizeMode="cover"
                    />


                    {/* CHECK */}

                    {isSelected && (

                      <View
                        style={styles.recipientCheck}
                      >

                        <Text
                          style={
                            styles.recipientCheckText
                          }
                        >
                          ✓
                        </Text>

                      </View>

                    )}

                  </View>


                  <Text
                    style={styles.recipientName}
                    numberOfLines={1}
                  >
                    {user.name}
                  </Text>

                </TouchableOpacity>

              );

            })}

          </ScrollView>


          {/* =================================================
              MESSAGE
          ================================================= */}

          <View
            style={styles.shareMessageContainer}
          >

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Tulis pesan..."
              placeholderTextColor="#85898A"
              style={styles.shareMessageInput}
              multiline
            />

          </View>


          {/* =================================================
              SEND
          ================================================= */}

          <TouchableOpacity
            style={[
              styles.shareSendButton,

              !selectedUser &&
                styles.shareSendButtonDisabled,
            ]}
            onPress={handleSendShare}
            disabled={!selectedUser}
            activeOpacity={0.8}
          >

            <Text
              style={styles.shareSendText}
            >
              {sent
                ? 'Berhasil dibagikan'
                : 'Kirim'}
            </Text>

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </Modal>

  );
}


// ============================================================
// COMMUNITY SCREEN
// ============================================================

export default function CommunityScreen({
  navigation,
}) {

  // ==========================================================
  // CATAT
  // ==========================================================

  const [
    addActivityVisible,
    setAddActivityVisible,
  ] = useState(false);


  // ==========================================================
  // INTERACTION SHEET
  // ==========================================================

  const [
    interactionVisible,
    setInteractionVisible,
  ] = useState(false);


  // ==========================================================
  // SHARE SHEET
  // ==========================================================

  const [
    shareVisible,
    setShareVisible,
  ] = useState(false);


  // ==========================================================
  // INTERACTION TAB
  // ==========================================================

  const [
    interactionTab,
    setInteractionTab,
  ] = useState('comments');


  // ==========================================================
  // SELECTED POST
  // ==========================================================

  const [
    selectedPost,
    setSelectedPost,
  ] = useState(null);


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Search
    search:
      require('../../../assets/cariijo.png'),

    // Contact
    message:
      require('../../../assets/kontak.png'),

    // Plus
    plus:
      require('../../../assets/tambah.png'),

    // Plus white
    pluswhite:
      require('../../../assets/tambahputih.png'),

    // More
    more:
      require('../../../assets/lainnya.png'),

    // Like
    like:
      require('../../../assets/suka.png'),

    // Comment
    comment:
      require('../../../assets/komen.png'),

    // Share
    share:
      require('../../../assets/bagikan2.png'),

  };


  // ==========================================================
  // CATAT
  // ==========================================================

  const handleOpenAddActivity = () => {

    setAddActivityVisible(true);

  };


  const handleCloseAddActivity = () => {

    setAddActivityVisible(false);

  };


  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleOpenSearch = () => {

    navigation.navigate('Search');

  };


  // ==========================================================
  // CONTACT
  // ==========================================================

  const handleOpenContact = () => {

    navigation.navigate('Contact');

  };


  // ==========================================================
  // MEMBERS / STORIES
  // ==========================================================

  const members = [

    {
      id: 'budi',

      name: 'Budi',

      image:
        require('../../../assets/budi.png'),

      storyImage:
        require('../../../assets/story5.png'),
    },


    {
      id: 'citra',

      name: 'Citra',

      image:
        require('../../../assets/citra.png'),

      storyImage:
        require('../../../assets/story6.png'),
    },


    {
      id: 'john',

      name: 'John',

      image:
        require('../../../assets/john.png'),

      storyImage:
        require('../../../assets/story7.png'),
    },


    {
      id: 'sara',

      name: 'Sara',

      image:
        require('../../../assets/sara.png'),

      storyImage:
        require('../../../assets/story8.png'),
    },

  ];


  // ==========================================================
  // OPEN STORY
  // ==========================================================

  const handleOpenStory = (member) => {

    navigation.navigate(
      'StoryViewer',
      {
        storyImage:
          member.storyImage,

        storyName:
          member.name,

        storyProfile:
          member.image,
      }
    );

  };


  // ==========================================================
  // POSTS
  // ==========================================================

  const posts = [

    // ========================================================
    // POST 1
    // ========================================================

    {
      id: 'post-1',

      name: 'Andi Pratama',

      username: '@andipratama04',

      profileImage:
        require('../../../assets/andi.png'),

      caption:
        'Pertama kali latihan biceps pake dumbel 12kg..',

      images: [

        require('../../../assets/gambarslide1.png'),

        require('../../../assets/gambarslide1b.png'),

      ],

      likes: '33',

      comments: '6',

      profile: {

        id: 'andi-pratama',

        name: 'Andi Pratama',

        username: '@andipratama04',

        profileImage:
          require('../../../assets/andi.png'),

        followers: '1,4 juta',

        following: '700',

        posts: '62',

      },

    },


    // ========================================================
    // POST 2
    // ========================================================

    {
      id: 'post-2',

      name: 'Citra Ayu',

      username: '@actrayu',

      profileImage:
        require('../../../assets/citra.png'),

      caption:
        'Makan siang makan ayam.',

      images: [

        require('../../../assets/gambarslide2.png'),

        require('../../../assets/gambarslide2b.png'),

      ],

      likes: '41',

      comments: '8',

      profile: {

        id: 'citra-ayu',

        name: 'Citra Ayu',

        username: '@actrayu',

        profileImage:
          require('../../../assets/citra.png'),

        followers: '850 ribu',

        following: '420',

        posts: '48',

      },

    },

  ];


  // ==========================================================
  // OPEN USER PROFILE
  // ==========================================================

  const handleOpenUserProfile = (post) => {

    navigation.navigate(
      'ProfileUser',
      {
        user: post.profile,
      }
    );

  };


  // ==========================================================
  // OPEN COMMENTS
  // ==========================================================

  const handleOpenComments = (post) => {

    setSelectedPost(post);

    setInteractionTab('comments');

    setInteractionVisible(true);

  };


  // ==========================================================
  // OPEN LIKES
  // ==========================================================

  const handleOpenLikes = (post) => {

    setSelectedPost(post);

    setInteractionTab('likes');

    setInteractionVisible(true);

  };


  // ==========================================================
  // CLOSE INTERACTION
  // ==========================================================

  const handleCloseInteraction = () => {

    setInteractionVisible(false);

    setSelectedPost(null);

  };


  // ==========================================================
  // OPEN SHARE
  // ==========================================================

  const handleOpenSharePost = (post) => {

    setSelectedPost(post);

    setShareVisible(true);

  };


  // ==========================================================
  // CLOSE SHARE
  // ==========================================================

  const handleCloseSharePost = () => {

    setShareVisible(false);

    setSelectedPost(null);

  };


  // ==========================================================
  // RENDER POST
  // ==========================================================

  const renderPost = (post) => {

    return (

      <View
        key={post.id}
        style={styles.postCard}
      >

        {/* ==================================================
            POST HEADER
        ================================================== */}

        <View
          style={styles.postHeader}
        >

          {/* PROFILE */}

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() =>
              handleOpenUserProfile(post)
            }
            activeOpacity={0.75}
          >

            <Image
              source={post.profileImage}
              style={styles.profileImage}
              resizeMode="cover"
            />

            <View
              style={styles.profileInfo}
            >

              <Text
                style={styles.profileName}
                numberOfLines={1}
              >
                {post.name}
              </Text>

              <Text
                style={styles.username}
                numberOfLines={1}
              >
                {post.username}
              </Text>

            </View>

          </TouchableOpacity>


          {/* MORE */}

          <TouchableOpacity
            style={styles.moreButton}
            activeOpacity={0.7}
          >

            <Image
              source={ICONS.more}
              style={styles.moreIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>

        </View>


        {/* ==================================================
            CAPTION
        ================================================== */}

        <Text
          style={styles.postCaption}
        >
          {post.caption}
        </Text>


        {/* ==================================================
            POST IMAGE CAROUSEL
        ================================================== */}

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.postMediaScroll}
          contentContainerStyle={
            styles.postMediaContent
          }
        >

          {post.images.map(
            (image, index) => (

              <Image
                key={index}
                source={image}
                style={styles.postImage}
                resizeMode="cover"
              />

            )
          )}

        </ScrollView>


        {/* ==================================================
            POST ACTIONS
        ================================================== */}

        <View
          style={styles.postActions}
        >

          {/* =================================================
              LIKE
          ================================================= */}

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() =>
              handleOpenLikes(post)
            }
            activeOpacity={0.7}
          >

            <Image
              source={ICONS.like}
              style={styles.actionIcon}
              resizeMode="contain"
            />

            <Text
              style={styles.actionCount}
            >
              {post.likes}
            </Text>

          </TouchableOpacity>


          {/* =================================================
              COMMENT
          ================================================= */}

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() =>
              handleOpenComments(post)
            }
            activeOpacity={0.7}
          >

            <Image
              source={ICONS.comment}
              style={styles.actionIcon}
              resizeMode="contain"
            />

            <Text
              style={styles.actionCount}
            >
              {post.comments}
            </Text>

          </TouchableOpacity>


          {/* =================================================
              SHARE
          ================================================= */}

          <TouchableOpacity
            style={styles.shareAction}
            onPress={() =>
              handleOpenSharePost(post)
            }
            activeOpacity={0.7}
          >

            <Image
              source={ICONS.share}
              style={styles.shareIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>

        </View>

      </View>

    );

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <SafeAreaView
      style={styles.safe}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <View
          style={styles.header}
        >

          <Text
            style={styles.headerTitle}
          >
            Komunitas
          </Text>


          <View
            style={styles.headerActions}
          >

            {/* SEARCH */}

            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleOpenSearch}
              activeOpacity={0.8}
            >

              <Image
                source={ICONS.search}
                style={styles.headerIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>


            {/* CONTACT */}

            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleOpenContact}
              activeOpacity={0.8}
            >

              <Image
                source={ICONS.message}
                style={styles.headerIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>

          </View>

        </View>


        {/* ==================================================
            MEMBER / STORY ROW
        ================================================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.memberScroll
          }
        >

          {/* TAMBAH STORY */}

          <TouchableOpacity
            style={styles.memberItem}
            onPress={() =>
              navigation.navigate('AddStory')
            }
            activeOpacity={0.8}
          >

            <View
              style={styles.addMemberCircle}
            >

              <Image
                source={ICONS.plus}
                style={styles.addMemberIcon}
                resizeMode="contain"
              />

            </View>

            <Text
              style={styles.memberName}
            >
              Tambah
            </Text>

          </TouchableOpacity>


          {/* MEMBERS */}

          {members.map(
            (member) => (

              <TouchableOpacity
                key={member.id}
                style={styles.memberItem}
                onPress={() =>
                  handleOpenStory(member)
                }
                activeOpacity={0.8}
              >

                <View
                  style={styles.memberCircle}
                >

                  <Image
                    source={member.image}
                    style={styles.memberImage}
                    resizeMode="cover"
                  />

                </View>


                <Text
                  style={styles.memberName}
                  numberOfLines={1}
                >
                  {member.name}
                </Text>

              </TouchableOpacity>

            )
          )}

        </ScrollView>


        {/* ==================================================
            POSTS
        ================================================== */}

        {posts.map(renderPost)}


        {/* ==================================================
            BOTTOM SPACING
        ================================================== */}

        <View
          style={styles.bottomSpacing}
        />

      </ScrollView>


      {/* ====================================================
          FLOATING ADD BUTTON
      ==================================================== */}

      <TouchableOpacity
        style={styles.floatingAddButton}
        onPress={() =>
          navigation.navigate('ShareActivity')
        }
        activeOpacity={0.8}
      >

        <Image
          source={ICONS.pluswhite}
          style={styles.floatingAddIcon}
          resizeMode="contain"
        />

      </TouchableOpacity>


      {/* ====================================================
          BOTTOM NAVIGATION
      ==================================================== */}

      <BottomNavigation
        activeTab="community"
        navigation={navigation}
        onPressAdd={handleOpenAddActivity}
      />


      {/* ====================================================
          ADD ACTIVITY SHEET
      ==================================================== */}

      <AddActivitySheet
        visible={addActivityVisible}
        onClose={handleCloseAddActivity}
      />


      {/* ====================================================
          COMMENT + LIKE BOTTOM SHEET
      ==================================================== */}

      <InteractionBottomSheet
        visible={interactionVisible}
        onClose={handleCloseInteraction}
        post={selectedPost}
        initialTab={interactionTab}
      />


      {/* ====================================================
          SHARE BOTTOM SHEET
      ==================================================== */}

      <ShareBottomSheet
        visible={shareVisible}
        onClose={handleCloseSharePost}
        post={selectedPost}
      />

    </SafeAreaView>

  );

}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // SAFE
  // ==========================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scrollContent: {
    paddingBottom: 155,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
  },


  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // HEADER ACTIONS
  // ==========================================================

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },


  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: '#EAF3F0',
    alignItems: 'center',
    justifyContent: 'center',
  },


  headerIcon: {
    width: 24,
    height: 24,
  },


  // ==========================================================
  // MEMBER SCROLL
  // ==========================================================

  memberScroll: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 25,
    gap: 12,
  },


  // ==========================================================
  // MEMBER ITEM
  // ==========================================================

  memberItem: {
    width: 68,
    marginRight: 8,
    alignItems: 'center',
  },


  // ==========================================================
  // ADD MEMBER
  // ==========================================================

  addMemberCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#8C9293',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },


  addMemberIcon: {
    width: 34,
    height: 34,
  },


  // ==========================================================
  // MEMBER CIRCLE
  // ==========================================================

  memberCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#63D6AA',
    padding: 3,
    backgroundColor: '#FFFFFF',
  },


  memberImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },


  // ==========================================================
  // MEMBER NAME
  // ==========================================================

  memberName: {
    marginTop: 6,
    fontSize: 14,
    color: '#272C2B',
    textAlign: 'center',
  },


  // ==========================================================
  // POST CARD
  // ==========================================================

  postCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: '#B8BDBC',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // POST HEADER
  // ==========================================================

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  // ==========================================================
  // PROFILE BUTTON
  // ==========================================================

  profileButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // PROFILE IMAGE
  // ==========================================================

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },


  // ==========================================================
  // PROFILE INFO
  // ==========================================================

  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },


  // ==========================================================
  // PROFILE NAME
  // ==========================================================

  profileName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // USERNAME
  // ==========================================================

  username: {
    marginTop: 1,
    fontSize: 14,
    color: '#85898A',
  },


  // ==========================================================
  // MORE BUTTON
  // ==========================================================

  moreButton: {
    width: 35,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },


  moreIcon: {
    width: 26,
    height: 26,
  },


  // ==========================================================
  // POST CAPTION
  // ==========================================================

  postCaption: {
    marginTop: 17,
    marginBottom: 12,
    fontSize: 17,
    lineHeight: 24,
    color: '#4B4E53',
  },


  // ==========================================================
  // POST MEDIA
  // ==========================================================

  postMediaScroll: {
    width: '100%',
    borderRadius: 8,
  },


  postMediaContent: {
    gap: 8,
  },


  postImage: {
    width: 312,
    height: 232,
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
  },


  // ==========================================================
  // POST ACTIONS
  // ==========================================================

  postActions: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },


  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },


  actionIcon: {
    width: 26,
    height: 26,
  },


  actionCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#16483E',
  },


  shareAction: {
    marginLeft: 'auto',
  },


  shareIcon: {
    width: 26,
    height: 26,
  },


  // ==========================================================
  // FLOATING BUTTON
  // ==========================================================

  floatingAddButton: {
    position: 'absolute',
    right: 20,
    bottom: 150,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#005B49',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },


  floatingAddIcon: {
    width: 30,
    height: 30,
  },


  // ==========================================================
  // BOTTOM SPACING
  // ==========================================================

  bottomSpacing: {
    height: 10,
  },


  // ==========================================================
  // SHEET OVERLAY
  // ==========================================================

  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },


  sheetBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },


  // ==========================================================
  // SHEET HANDLE
  // ==========================================================

  sheetHandle: {
    width: 76,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#85898A',
    alignSelf: 'center',
    marginTop: 19,
    marginBottom: 18,
  },


  // ==========================================================
  // INTERACTION SHEET
  // ==========================================================

  interactionSheet: {
    height: '82%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },


  // ==========================================================
  // INTERACTION HEADER
  // ==========================================================

  interactionHeader: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },


  interactionTab: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },


  interactionTabText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111111',
  },


  interactionTabTextActive: {
    fontWeight: '600',
    color: '#111111',
  },


  // ==========================================================
  // LIKE ICON DI HEADER
  // ==========================================================

  interactionLikeIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },


  interactionLikeCount: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111111',
  },


  interactionLikeCountActive: {
    fontWeight: '600',
  },


  // ==========================================================
  // TAB LINE
  // ==========================================================

  tabLineContainer: {
    height: 1,
    backgroundColor: '#BFC1C1',
    marginHorizontal: 20,
    position: 'relative',
  },


  tabIndicator: {
    position: 'absolute',
    top: -2,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#111111',
  },


  tabIndicatorComments: {
    left: 0,
    width: '29%',
  },


  tabIndicatorLikes: {
    left: '35%',
    width: '18%',
  },


  // ==========================================================
  // COMMENT SCROLL
  // ==========================================================

  commentScroll: {
    flex: 1,
  },


  commentList: {
    paddingHorizontal: 38,
    paddingTop: 32,
    paddingBottom: 15,
  },


  // ==========================================================
  // COMMENT ITEM
  // ==========================================================

  commentItem: {
    flexDirection: 'row',
    marginBottom: 25,
  },


  commentAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
  },


  commentContent: {
    flex: 1,
    paddingTop: 2,
  },


  commentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },


  commentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003F34',
  },


  commentDot: {
    marginHorizontal: 6,
    fontSize: 14,
    color: '#85898A',
  },


  commentTime: {
    fontSize: 14,
    color: '#85898A',
  },


  commentText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: '#222222',
  },


  // ==========================================================
  // COMMENT INPUT ROW
  // ==========================================================

  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // COMMENT INPUT CONTAINER
  // ==========================================================

  commentInputContainer: {
    flex: 1,
    height: 58,
    borderRadius: 30,
    backgroundColor: '#D9D9DB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },


  // ==========================================================
  // EMOJI BUTTON
  // ==========================================================

  emojiButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },


  // ==========================================================
  // ⭐ EMOJI ASSET
  // ==========================================================

  emojiIcon: {
    width: 25,
    height: 25,
  },


  // ==========================================================
  // COMMENT INPUT
  // ==========================================================

  commentInput: {
    flex: 1,
    fontSize: 17,
    color: '#222222',
    paddingVertical: 0,
  },


  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  commentSendButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginLeft: 10,
    backgroundColor: '#D9D9DB',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // ⭐ SEND ASSET
  // ==========================================================

  commentSendIcon: {
    width: 27,
    height: 27,
  },


  // ==========================================================
  // LIKE SCROLL
  // ==========================================================

  likeScroll: {
    flex: 1,
  },


  likeList: {
    paddingHorizontal: 38,
    paddingTop: 32,
    paddingBottom: 30,
  },


  // ==========================================================
  // LIKE USER
  // ==========================================================

  likeUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },


  likeUserImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
  },


  likeUserName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // SHARE SHEET
  // ==========================================================

  shareSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },


  shareTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#003F34',
    marginBottom: 16,
  },


  // ==========================================================
  // SHARE POST PREVIEW
  // ==========================================================

  sharePostPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E2E1',
    borderRadius: 12,
    marginBottom: 20,
  },


  sharePreviewImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },


  sharePreviewContent: {
    flex: 1,
  },


  sharePreviewName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#003F34',
    marginBottom: 4,
  },


  sharePreviewCaption: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666A6B',
  },


  // ==========================================================
  // SHARE SECTION
  // ==========================================================

  shareSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003F34',
    marginBottom: 13,
  },


  recipientList: {
    gap: 17,
    paddingBottom: 15,
  },


  recipientItem: {
    width: 72,
    alignItems: 'center',
  },


  recipientImageContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },


  recipientImageSelected: {
    borderColor: '#227B68',
  },


  recipientImage: {
    width: '100%',
    height: '100%',
    borderRadius: 29,
  },


  recipientCheck: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: '#227B68',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },


  recipientCheckText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },


  recipientName: {
    marginTop: 6,
    fontSize: 12,
    color: '#272C2B',
    textAlign: 'center',
  },


  // ==========================================================
  // SHARE MESSAGE
  // ==========================================================

  shareMessageContainer: {
    minHeight: 55,
    maxHeight: 90,
    borderRadius: 14,
    backgroundColor: '#F0F1F1',
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 15,
  },


  shareMessageInput: {
    flex: 1,
    fontSize: 15,
    color: '#222222',
    textAlignVertical: 'top',
    paddingTop: 12,
  },


  // ==========================================================
  // SHARE SEND
  // ==========================================================

  shareSendButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#227B68',
    alignItems: 'center',
    justifyContent: 'center',
  },


  shareSendButtonDisabled: {
    backgroundColor: '#A7AAAA',
  },


  shareSendText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

});