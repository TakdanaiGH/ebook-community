<!-- app/views/users/show.html.erb -->
<h1>Your Profile</h1>

<div>
  <% if @user.profile_picture.attached? %>
    <%= image_tag @user.profile_picture, class: 'profile-pic' %>
  <% else %>
    <%= image_tag 'default-avatar.png', class: 'profile-pic' %>
  <% end %>
</div>

<p><strong>Name:</strong> <%= @user.name %></p>
<p><strong>Age:</strong> <%= @user.age %></p>
<p><strong>Occupation:</strong> <%= @user.occupation %></p>
<p><strong>Housing Situation:</strong> <%= @user.housing_situation %></p>
<p><strong>Income:</strong> <%= @user.income %></p>
<p><strong>Short-Term Goals:</strong> <%= @user.goals_text %></p>
<p><strong>Questions:</strong> <%= @user.questions_text %></p>
<p><strong>Computer Equipment:</strong> <%= @user.computer_equipment %></p>

<%= link_to 'Edit Profile', edit_user_registration_path %>
