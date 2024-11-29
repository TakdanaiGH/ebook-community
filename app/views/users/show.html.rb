<h1>Your Profile</h1>

<div class="profile-picture-container">
  <% if current_user.profile_picture.attached? %>
    <%= image_tag current_user.profile_picture, class: 'profile-picture' %>
  <% else %>
    <%= image_tag 'default-avatar.png', class: 'profile-picture' %> 
  <% end %>
</div>

<p><strong>Name:</strong> <%= current_user.name.presence || "Not provided" %></p>
<p><strong>Age:</strong> <%= current_user.age.presence || "Not provided" %></p>
<p><strong>Occupation:</strong> <%= current_user.occupation.presence || "Not provided" %></p>
<p><strong>Housing Situation:</strong> <%= current_user.housing_situation.presence || "Not provided" %></p>
<p><strong>Income:</strong> <%= current_user.income.presence || "Not provided" %></p>
<p><strong>Short-Term Goals:</strong> <%= current_user.goals_text.presence || "Not provided" %></p>
<p><strong>Questions:</strong> <%= current_user.questions_text.presence || "Not provided" %></p>
<p><strong>Computer Equipment:</strong> <%= current_user.computer_equipment.presence || "Not provided" %></p>

<%= link_to 'Edit Profile', edit_user_registration_path %>
